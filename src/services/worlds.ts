import type { AppProgress, WorldStatus, WorldId } from '../types';

// ─── World definitions (static metadata) ─────────────────────────────────────
const WORLD_META: Record<WorldId, Pick<WorldStatus, 'id'|'name'|'tagline'|'emoji'|'color'|'bgGradient'|'starsTotal'|'unlockHint'>> = {
  memory: {
    id: 'memory',
    name: 'Svet pamćenja',
    tagline: 'Vežbaj mozak!',
    emoji: '🧠',
    color: '#FF6B6B',
    bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    starsTotal: 9,
    unlockHint: '',
  },
  alphabet: {
    id: 'alphabet',
    name: 'Svet slova',
    tagline: 'Nauči azbuku!',
    emoji: '🔤',
    color: '#A29BFE',
    bgGradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    starsTotal: 30,
    unlockHint: 'Završi 1 igru pamćenja!',
  },
  shadow: {
    id: 'shadow',
    name: 'Svet senki',
    tagline: 'Pronađi senke!',
    emoji: '🌑',
    color: '#4ECDC4',
    bgGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    starsTotal: 27,
    unlockHint: 'Nauči 5 slova!',
  },
};

// ─── Unlock thresholds ────────────────────────────────────────────────────────
const UNLOCK = {
  alphabet: (p: AppProgress) => p.memoryScores.length >= 1,
  shadow:   (p: AppProgress) => p.alphabetProgress.learnedLetters.length >= 5,
};

const COMPLETE = {
  memory:   (p: AppProgress) => p.memoryScores.reduce((a, s) => a + s.stars, 0) >= 9,
  alphabet: (p: AppProgress) => p.alphabetProgress.learnedLetters.length >= 30,
  shadow:   (p: AppProgress) => p.shadowScores.length >= 9,
};

// ─── Main computation — called after every progress update ────────────────────
export const computeWorlds = (progress: AppProgress): WorldStatus[] => {
  const memStars   = progress.memoryScores.reduce((a, s) => a + s.stars, 0);
  const alphaStars = progress.alphabetProgress.learnedLetters.length;
  const shadStars  = progress.shadowScores.reduce((a, s) => a + s.stars, 0);

  const earned: Record<WorldId, number> = {
    memory:   memStars,
    alphabet: alphaStars,
    shadow:   shadStars,
  };

  const ORDER: WorldId[] = ['memory', 'alphabet', 'shadow'];

  return ORDER.map((id, i) => ({
    ...WORLD_META[id],
    unlocked:    i === 0 ? true : UNLOCK[id as 'alphabet' | 'shadow'](progress),
    completed:   COMPLETE[id](progress),
    starsEarned: earned[id],
  }));
};

// ─── Check for newly unlocked worlds (for notifications) ─────────────────────
export const getNewlyUnlockedWorlds = (
  prevWorlds: WorldStatus[],
  nextWorlds: WorldStatus[]
): WorldStatus[] =>
  nextWorlds.filter((w, i) => !prevWorlds[i].unlocked && w.unlocked);
