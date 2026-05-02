/**
 * UnlockEngine — world unlock / progression rules.
 *
 * Derives WorldStatus[] from AppProgress on every state update.
 * Rules are pure functions — never stored, always recomputed.
 *
 * Unlock thresholds:
 *   Memory World  → always available
 *   Letter Land   → complete ≥ 1 Memory game
 *   Shadow Realm  → learn ≥ 5 letters in Letter Land
 */
export {
  computeWorlds,
  getNewlyUnlockedWorlds,
} from '../services/worlds';
