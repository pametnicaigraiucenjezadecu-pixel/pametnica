/**
 * GameStore — single source of truth for the entire application.
 *
 * Orchestrates all four engines:
 *   StorageService  → read / write localStorage
 *   ProgressEngine  → badge unlock rules
 *   UnlockEngine    → world progression rules
 *   SessionEngine   → play-session and daily streak
 *
 * Consumed anywhere in the component tree via useGameStore().
 * Alias: useApp() is kept for backward compatibility.
 */
export {
  AppProvider as GameStoreProvider,
  AppProvider,
  useApp as useGameStore,
  useApp,
} from '../context/AppContext';
