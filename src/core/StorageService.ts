/**
 * StorageService — persistence layer.
 *
 * Wraps all localStorage I/O behind a typed API.
 * Nothing in the rest of the app touches localStorage directly.
 */
export {
  loadProfile,
  saveProfile,
  deleteProfile,
  loadProgress,
  saveProgress,
  createDefaultProgress,
  DEFAULT_BADGES,
} from '../services/storage';
