import type { UserProfile, AppProgress, Badge, AlphabetProgress } from '../types';
import { DEFAULT_STREAK } from './session';

const KEYS = {
  PROFILE:  'kidlearn_profile',
  PROGRESS: 'kidlearn_progress',
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const read = <T>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const write = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('[storage] write failed for key:', key);
  }
};

// ─── Profile API ──────────────────────────────────────────────────────────────
export const loadProfile = (): UserProfile | null => read<UserProfile>(KEYS.PROFILE);
export const saveProfile = (profile: UserProfile): void => write(KEYS.PROFILE, profile);
export const deleteProfile = (): void => {
  localStorage.removeItem(KEYS.PROFILE);
  localStorage.removeItem(KEYS.PROGRESS);
};

// ─── Progress API ─────────────────────────────────────────────────────────────
export const loadProgress = (): AppProgress | null => {
  const raw = read<AppProgress>(KEYS.PROGRESS);
  if (!raw) return null;
  return {
    ...raw,
    sessions: raw.sessions ?? [],
    streak: raw.streak ?? DEFAULT_STREAK,
  };
};

export const saveProgress = (progress: AppProgress): void =>
  write(KEYS.PROGRESS, progress);

// ─── Default Progress Factory ─────────────────────────────────────────────────
export const createDefaultProgress = (userId: string): AppProgress => ({
  userId,
  totalStars: 0,
  badges: DEFAULT_BADGES.map(b => ({ ...b, unlockedAt: null })),
  memoryScores: [],
  alphabetProgress: { learnedLetters: [], lastVisited: null },
  shadowScores: [],
  sessions: [],
  streak: DEFAULT_STREAK,
  lastPlayed: new Date().toISOString(),
});

// ─── Badge Definitions ────────────────────────────────────────────────────────
export const DEFAULT_BADGES: Badge[] = [
  { id: 'first_memory',     name: 'Majstor pamćenja', description: 'Završio/la prvu igru pamćenja',    emoji: '🧠', unlockedAt: null },
  { id: 'alphabet_complete',name: 'Heroj slova',         description: 'Naučio/la sva 30 slova',            emoji: '📚', unlockedAt: null },
  { id: 'shadow_5',         name: 'Lovac na senke',    description: 'Završio/la 5 nivoa senki',         emoji: '🌑', unlockedAt: null },
  { id: 'stars_10',         name: 'Sakupljač zvezda',  description: 'Zaradio/la 10 zvezda',             emoji: '⭐', unlockedAt: null },
  { id: 'stars_30',         name: 'Superzvezda',       description: 'Zaradio/la 30 zvezda',             emoji: '🌟', unlockedAt: null },
  { id: 'perfect_memory',   name: 'Savršen meč',       description: 'Pobedio/la igru pamćenja sa 3 ⭐', emoji: '🏆', unlockedAt: null },
  { id: 'streak_3',         name: '3 dana zaredom',    description: 'Igrao/la 3 dana uzastopno',        emoji: '🔥', unlockedAt: null },
  { id: 'world_2_unlock',   name: 'Istraživač',        description: 'Odigrao/la prvu igru pamćenja',    emoji: '🗺️', unlockedAt: null },
  { id: 'world_3_unlock',   name: 'Hodač senki',       description: 'Naučio/la 5 slova',                emoji: '🌘', unlockedAt: null },
];

// ─── Badge Unlock Logic ───────────────────────────────────────────────────────
export const checkAndUnlockBadges = (
  progress: AppProgress
): { progress: AppProgress; newBadges: Badge[] } => {
  const badges = progress.badges.map(b => ({ ...b }));
  const newBadges: Badge[] = [];

  const unlock = (id: string) => {
    const badge = badges.find(b => b.id === id);
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = new Date().toISOString();
      newBadges.push(badge);
    }
  };

  const { memoryScores, alphabetProgress, shadowScores, totalStars, streak } = progress;
  const memoryGames    = memoryScores.length;
  const lettersLearned = alphabetProgress.learnedLetters.length;
  const shadowLevels   = shadowScores.length;
  const hasPerfect     = memoryScores.some(s => s.stars === 3);
  const alphabetUnlocked = memoryGames >= 1;
  const shadowUnlocked   = lettersLearned >= 5;

  if (memoryGames >= 1)     unlock('first_memory');
  if (lettersLearned >= 30) unlock('alphabet_complete');
  if (shadowLevels >= 5)    unlock('shadow_5');
  if (totalStars >= 10)     unlock('stars_10');
  if (totalStars >= 30)     unlock('stars_30');
  if (hasPerfect)           unlock('perfect_memory');
  if (streak.current >= 3)  unlock('streak_3');
  if (alphabetUnlocked)     unlock('world_2_unlock');
  if (shadowUnlocked)       unlock('world_3_unlock');

  return { progress: { ...progress, badges }, newBadges };
};

export const markLetterLearned = (
  progress: AppProgress,
  letter: string
): AppProgress => {
  const ap: AlphabetProgress = {
    ...progress.alphabetProgress,
    lastVisited: letter,
    learnedLetters: progress.alphabetProgress.learnedLetters.includes(letter)
      ? progress.alphabetProgress.learnedLetters
      : [...progress.alphabetProgress.learnedLetters, letter],
  };
  return { ...progress, alphabetProgress: ap };
};
