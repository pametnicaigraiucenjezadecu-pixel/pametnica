/**
 * @core — public API of the application core.
 *
 * Import from this barrel in screens and modules:
 *   import { useGameStore } from '@core';
 */
export { GameStoreProvider, useGameStore, useApp } from './GameStore';
export { computeWorlds, getNewlyUnlockedWorlds }   from './UnlockEngine';
export { checkAndUnlockBadges, markLetterLearned } from './ProgressEngine';
export {
  createSession, endSession,
  addModuleToSession, touchStreak,
  formatDuration, DEFAULT_STREAK,
} from './SessionEngine';
export {
  loadProfile, saveProfile, deleteProfile,
  loadProgress, saveProgress, createDefaultProgress,
} from './StorageService';
