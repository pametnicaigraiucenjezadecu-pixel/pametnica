/**
 * ProgressEngine — badge unlock logic and letter tracking.
 *
 * Pure functions that take the current AppProgress and return
 * a mutated copy + a list of newly-unlocked badges.
 * No side effects — callers decide when/how to persist.
 */
export {
  checkAndUnlockBadges,
  markLetterLearned,
  DEFAULT_BADGES,
} from '../services/storage';
