import type { PlaySession, Streak, WorldId } from '../types';

// ─── Session factory ──────────────────────────────────────────────────────────
export const createSession = (): PlaySession => ({
  id: crypto.randomUUID(),
  startedAt: new Date().toISOString(),
  endedAt: null,
  durationSeconds: 0,
  starsEarned: 0,
  modulesPlayed: [],
});

export const endSession = (
  session: PlaySession,
  starsEarned: number
): PlaySession => ({
  ...session,
  endedAt: new Date().toISOString(),
  durationSeconds: Math.floor(
    (Date.now() - new Date(session.startedAt).getTime()) / 1000
  ),
  starsEarned,
});

export const addModuleToSession = (
  session: PlaySession,
  worldId: WorldId
): PlaySession => ({
  ...session,
  modulesPlayed: session.modulesPlayed.includes(worldId)
    ? session.modulesPlayed
    : [...session.modulesPlayed, worldId],
});

// ─── Streak logic ─────────────────────────────────────────────────────────────
export const DEFAULT_STREAK: Streak = {
  current: 0,
  longest: 0,
  lastPlayedDate: null,
  totalDaysPlayed: 0,
};

const todayStr = () => new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const yesterdayStr = () =>
  new Date(Date.now() - 86_400_000).toISOString().split('T')[0];

export const touchStreak = (streak: Streak): Streak => {
  const today = todayStr();
  if (streak.lastPlayedDate === today) return streak; // already counted today

  const continuing = streak.lastPlayedDate === yesterdayStr();
  const newCurrent = continuing ? streak.current + 1 : 1;

  return {
    current: newCurrent,
    longest: Math.max(newCurrent, streak.longest),
    lastPlayedDate: today,
    totalDaysPlayed: streak.totalDaysPlayed + 1,
  };
};

// ─── Format helpers ───────────────────────────────────────────────────────────
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};
