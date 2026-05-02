/**
 * GameStore — single source of truth for KidLearn.
 *
 * Responsibilities:
 *  1. Profile creation / loading / reset
 *  2. Progress mutation (memory scores, alphabet, shadow)
 *  3. Badge unlock detection → in-app notifications
 *  4. World unlock status computation (derived, never stored)
 *  5. Session lifecycle (start → track → end)
 *  6. Daily streak management
 */
import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import type {
  AppState, Screen, Script, UserProfile, AppProgress,
  MemoryScore, ShadowScore, WorldId, AppNotification, PlaySession,
} from '../types';
import {
  loadProfile, saveProfile, loadProgress, saveProgress,
  createDefaultProgress, checkAndUnlockBadges, markLetterLearned,
} from '../services/storage';
import { computeWorlds, getNewlyUnlockedWorlds } from '../services/worlds';
import {
  createSession, endSession, addModuleToSession, touchStreak,
} from '../services/session';

const SCRIPT_KEY = 'kidlearn_script';
const loadScript = (): Script => {
  try { return localStorage.getItem(SCRIPT_KEY) === 'cyrillic' ? 'cyrillic' : 'latin'; } catch { return 'latin'; }
};

// ─── Actions ──────────────────────────────────────────────────────────────────
type Action =
  | { type: 'INIT'; profile: UserProfile; progress: AppProgress }
  | { type: 'NAVIGATE'; screen: Screen }
  | { type: 'SET_PROGRESS'; progress: AppProgress }
  | { type: 'PUSH_NOTIFICATION'; notification: AppNotification }
  | { type: 'DISMISS_NOTIFICATION'; id: string }
  | { type: 'START_SESSION'; session: PlaySession }
  | { type: 'UPDATE_SESSION'; session: PlaySession }
  | { type: 'SET_SCRIPT'; script: Script }
  | { type: 'RESET' };

const EMPTY_WORLDS = computeWorlds(createDefaultProgress('__empty'));

const INITIAL: AppState = {
  profile: null,
  progress: null,
  currentScreen: 'home',
  worlds: EMPTY_WORLDS,
  notifications: [],
  activeSession: null,
  script: loadScript(),
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        profile: action.profile,
        progress: action.progress,
        worlds: computeWorlds(action.progress),
        currentScreen: 'menu',
      };
    case 'NAVIGATE':
      return { ...state, currentScreen: action.screen };
    case 'SET_PROGRESS': {
      const worlds = computeWorlds(action.progress);
      return { ...state, progress: action.progress, worlds };
    }
    case 'PUSH_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };
    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.id),
      };
    case 'START_SESSION':
      return { ...state, activeSession: action.session };
    case 'UPDATE_SESSION':
      return { ...state, activeSession: action.session };
    case 'SET_SCRIPT':
      return { ...state, script: action.script };
    case 'RESET':
      return INITIAL;
    default:
      return state;
  }
};

// ─── Context interface ────────────────────────────────────────────────────────
interface GameStore {
  state: AppState;
  navigate: (screen: Screen) => void;
  createProfile: (name: string, avatarIndex: number) => void;
  resetProfile: () => void;
  saveMemoryScore: (score: Omit<MemoryScore, 'completedAt'>) => void;
  saveShadowScore: (score: Omit<ShadowScore, 'completedAt'>) => void;
  learnLetter: (letter: string) => void;
  trackModule: (worldId: WorldId) => void;
  endCurrentSession: () => void;
  dismissNotification: (id: string) => void;
  setScript: (script: Script) => void;
}

const Ctx = createContext<GameStore | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  // Store prev worlds ref to detect newly-unlocked worlds
  const prevWorldsRef = useRef(EMPTY_WORLDS);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const profile = loadProfile();
    if (!profile) return;
    let progress = loadProgress() ?? createDefaultProgress(profile.id);
    // Touch streak on app open
    progress = { ...progress, streak: touchStreak(progress.streak) };
    saveProgress(progress);
    const session = createSession();
    dispatch({ type: 'INIT', profile, progress });
    dispatch({ type: 'START_SESSION', session });
  }, []);

  // ── Internal: persist + badge check + notification emit ───────────────────
  const commitProgress = useCallback(
    (next: AppProgress, sessionStarsAdded = 0) => {
      const { progress: withBadges, newBadges } = checkAndUnlockBadges(next);
      saveProgress(withBadges);
      dispatch({ type: 'SET_PROGRESS', progress: withBadges });

      // Detect newly unlocked worlds
      const nextWorlds = computeWorlds(withBadges);
      const unlocked = getNewlyUnlockedWorlds(prevWorldsRef.current, nextWorlds);
      prevWorldsRef.current = nextWorlds;

      unlocked.forEach(w => {
        dispatch({
          type: 'PUSH_NOTIFICATION',
          notification: {
            id: crypto.randomUUID(),
            type: 'world-unlock',
            title: `${w.name} otključan!`,
            emoji: w.emoji,
            message: `Možeš da igraš ${w.name}!`,
          },
        });
      });

      newBadges.forEach(b => {
        dispatch({
          type: 'PUSH_NOTIFICATION',
          notification: {
            id: crypto.randomUUID(),
            type: 'badge',
            title: 'Nova značka!',
            emoji: b.emoji,
            message: b.name,
          },
        });
      });

      // Update active session star count
      if (sessionStarsAdded > 0 && state.activeSession) {
        const updated: PlaySession = {
          ...state.activeSession,
          starsEarned: state.activeSession.starsEarned + sessionStarsAdded,
        };
        dispatch({ type: 'UPDATE_SESSION', session: updated });
      }
    },
    [state.activeSession]
  );

  // ── Public API ────────────────────────────────────────────────────────────
  const navigate = useCallback((screen: Screen) => {
    dispatch({ type: 'NAVIGATE', screen });
  }, []);

  const createProfile = useCallback((name: string, avatarIndex: number) => {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name,
      avatarIndex,
      createdAt: new Date().toISOString(),
    };
    const progress = createDefaultProgress(profile.id);
    saveProfile(profile);
    saveProgress(progress);
    const session = createSession();
    dispatch({ type: 'INIT', profile, progress });
    dispatch({ type: 'START_SESSION', session });
  }, []);

  const resetProfile = useCallback(() => {
    if (state.activeSession && state.progress) {
      const closed = endSession(state.activeSession, state.activeSession.starsEarned);
      const next: AppProgress = {
        ...state.progress,
        sessions: [...state.progress.sessions, closed],
        lastPlayed: new Date().toISOString(),
      };
      saveProgress(next);
    }
    localStorage.removeItem('kidlearn_profile');
    localStorage.removeItem('kidlearn_progress');
    dispatch({ type: 'RESET' });
  }, [state.activeSession, state.progress]);

  const saveMemoryScore = useCallback(
    (score: Omit<MemoryScore, 'completedAt'>) => {
      if (!state.progress) return;
      const full: MemoryScore = { ...score, completedAt: new Date().toISOString() };
      commitProgress(
        {
          ...state.progress,
          totalStars: state.progress.totalStars + score.stars,
          memoryScores: [...state.progress.memoryScores, full],
          lastPlayed: new Date().toISOString(),
        },
        score.stars
      );
    },
    [state.progress, commitProgress]
  );

  const saveShadowScore = useCallback(
    (score: Omit<ShadowScore, 'completedAt'>) => {
      if (!state.progress) return;
      const full: ShadowScore = { ...score, completedAt: new Date().toISOString() };
      commitProgress(
        {
          ...state.progress,
          totalStars: state.progress.totalStars + score.stars,
          shadowScores: [...state.progress.shadowScores, full],
          lastPlayed: new Date().toISOString(),
        },
        score.stars
      );
    },
    [state.progress, commitProgress]
  );

  const learnLetter = useCallback(
    (letter: string) => {
      if (!state.progress) return;
      const isNew = !state.progress.alphabetProgress.learnedLetters.includes(letter);
      const next = markLetterLearned(state.progress, letter);
      commitProgress(
        {
          ...next,
          totalStars: isNew ? next.totalStars + 1 : next.totalStars,
        },
        isNew ? 1 : 0
      );
    },
    [state.progress, commitProgress]
  );

  const trackModule = useCallback(
    (worldId: WorldId) => {
      if (!state.activeSession) return;
      const updated = addModuleToSession(state.activeSession, worldId);
      dispatch({ type: 'UPDATE_SESSION', session: updated });
    },
    [state.activeSession]
  );

  const endCurrentSession = useCallback(() => {
    if (!state.activeSession || !state.progress) return;
    const closed = endSession(state.activeSession, state.activeSession.starsEarned);
    const next: AppProgress = {
      ...state.progress,
      sessions: [...state.progress.sessions, closed],
      lastPlayed: new Date().toISOString(),
    };
    commitProgress(next, 0);
    navigate('session-end');
  }, [state.activeSession, state.progress, commitProgress, navigate]);

  const dismissNotification = useCallback((id: string) => {
    dispatch({ type: 'DISMISS_NOTIFICATION', id });
  }, []);

  const setScript = useCallback((script: Script) => {
    dispatch({ type: 'SET_SCRIPT', script });
    try { localStorage.setItem(SCRIPT_KEY, script); } catch {}
  }, []);

  return (
    <Ctx.Provider value={{
      state, navigate,
      createProfile, resetProfile,
      saveMemoryScore, saveShadowScore,
      learnLetter, trackModule,
      endCurrentSession, dismissNotification,
      setScript,
    }}>
      {children}
    </Ctx.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useApp = (): GameStore => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
