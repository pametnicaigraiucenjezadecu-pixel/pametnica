/**
 * SessionEngine — play-session lifecycle and daily streak logic.
 *
 * A Session is the period between when the user opens the app
 * and when they close it (or tap "End Session").
 *
 * Streak increments once per calendar day (YYYY-MM-DD comparison).
 */
export {
  createSession,
  endSession,
  addModuleToSession,
  touchStreak,
  formatDuration,
  DEFAULT_STREAK,
} from '../services/session';
