// ─── Script ───────────────────────────────────────────────────────────────────
export type Script = 'latin' | 'cyrillic';

// ─── UI Mode ──────────────────────────────────────────────────────────────────
export type UiMode = 'ios' | 'android';

// ─── Saved Game State (for Resume prompt) ────────────────────────────────────
export interface SavedGameState {
  screen: 'memory' | 'alphabet' | 'shadow';
  savedAt: string; // ISO timestamp
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export type Screen =
  | 'home'
  | 'menu'          // → WorldMapScreen
  | 'alphabet'
  | 'memory'
  | 'shadow'
  | 'progress'
  | 'session-end';  // session summary

// ─── Difficulty ───────────────────────────────────────────────────────────────
export type Difficulty = 'easy' | 'medium' | 'hard';

// ─── User Profile ─────────────────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  name: string;
  avatarIndex: number;
  createdAt: string;
}

// ─── Memory Game ──────────────────────────────────────────────────────────────
export interface MemoryCardData {
  id: string;
  emoji: string;
  name: string;
  category: 'fruits' | 'animals' | 'vehicles' | 'food';
}

export interface MemoryCardInstance {
  instanceId: string;
  cardData: MemoryCardData;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryScore {
  difficulty: Difficulty;
  moves: number;
  timeSeconds: number;
  stars: number;
  completedAt: string;
}

// ─── Alphabet ─────────────────────────────────────────────────────────────────
export interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
  phoneme: string;
}

export interface AlphabetProgress {
  learnedLetters: string[];
  lastVisited: string | null;
}

// ─── Shadow Match ─────────────────────────────────────────────────────────────
export interface ShadowItem {
  id: string;
  emoji: string;
  name: string;
}

export interface ShadowLevel {
  level: number;
  target: ShadowItem;
  options: ShadowItem[];
}

export interface ShadowScore {
  level: number;
  accuracy: number;
  stars: number;
  completedAt: string;
}

// ─── Badges ───────────────────────────────────────────────────────────────────
export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlockedAt: string | null;
}

// ─── Progress ─────────────────────────────────────────────────────────────────
export interface AppProgress {
  userId: string;
  totalStars: number;
  badges: Badge[];
  memoryScores: MemoryScore[];
  alphabetProgress: AlphabetProgress;
  shadowScores: ShadowScore[];
  sessions: PlaySession[];
  streak: Streak;
  lastPlayed: string;
}

// ─── World / Unlock System ────────────────────────────────────────────────────
export type WorldId = 'memory' | 'alphabet' | 'shadow';

export interface WorldStatus {
  id: WorldId;
  name: string;
  tagline: string;
  emoji: string;
  color: string;
  bgGradient: string;
  /** Always computed from progress — never stored */
  unlocked: boolean;
  completed: boolean;
  starsEarned: number;
  starsTotal: number;
  /** Human-readable requirement shown on locked world */
  unlockHint: string;
}

// ─── Session System ───────────────────────────────────────────────────────────
export interface PlaySession {
  id: string;
  startedAt: string;
  endedAt: string | null;
  durationSeconds: number;
  starsEarned: number;
  modulesPlayed: WorldId[];
}

export interface Streak {
  current: number;
  longest: number;
  lastPlayedDate: string | null; // YYYY-MM-DD
  totalDaysPlayed: number;
}

// ─── Notification (in-app toast for badge unlocks) ───────────────────────────
export interface AppNotification {
  id: string;
  type: 'badge' | 'world-unlock' | 'streak';
  title: string;
  emoji: string;
  message: string;
}

// ─── App State ────────────────────────────────────────────────────────────────
export interface AppState {
  profile: UserProfile | null;
  progress: AppProgress | null;
  currentScreen: Screen;
  /** Worlds computed from progress on every update */
  worlds: WorldStatus[];
  /** Queue of toasts to display */
  notifications: AppNotification[];
  /** Active play session */
  activeSession: PlaySession | null;
  /** Display script: Latin or Cyrillic */
  script: Script;
  /** Visual theme: iOS or Android */
  uiMode: UiMode;
  /** Interrupted game to offer Resume for */
  savedGameState: SavedGameState | null;
}
