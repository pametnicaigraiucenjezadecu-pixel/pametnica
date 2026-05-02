import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { useScript } from '../hooks/useScript';

const AVATARS = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐨', '🦁', '🐵', '🐸', '🐧'];

const MODULES = [
  {
    id: 'alphabet' as const,
    label: 'Slova A-Z',
    emoji: '🔤',
    color: '#A29BFE',
    bg: '#EDE9FE',
    description: 'Nauči slova od A do Z',
    stars: (p: ReturnType<typeof useApp>['state']['progress']) =>
      p?.alphabetProgress.learnedLetters.length ?? 0,
    maxStars: 26,
  },
  {
    id: 'memory' as const,
    label: 'Igra pamćenja',
    emoji: '🧠',
    color: '#FF6B6B',
    bg: '#FFF0F0',
    description: 'Pronađi parove karata',
    stars: (p: ReturnType<typeof useApp>['state']['progress']) =>
      p?.memoryScores.reduce((acc, s) => acc + s.stars, 0) ?? 0,
    maxStars: null,
  },
  {
    id: 'shadow' as const,
    label: 'Igra senki',
    emoji: '🌑',
    color: '#4ECDC4',
    bg: '#E0FAF8',
    description: 'Pronađi pravu senku',
    stars: (p: ReturnType<typeof useApp>['state']['progress']) =>
      p?.shadowScores.reduce((acc, s) => acc + s.stars, 0) ?? 0,
    maxStars: null,
  },
];

export const ModuleSelectScreen: React.FC = () => {
  const { state, navigate, resetProfile } = useApp();
  const s = useScript();
  const { profile, progress } = state;

  const avatar = AVATARS[profile?.avatarIndex ?? 0];
  const totalStars = progress?.totalStars ?? 0;
  const unlockedBadges = progress?.badges.filter(b => b.unlockedAt).length ?? 0;

  return (
    <div className="screen menu-screen">
      <div className="menu-header">
        <div className="menu-header__profile">
          <span className="menu-header__avatar">{avatar}</span>
          <div>
            <p className="menu-header__greeting">{s('Zdravo,')}</p>
            <p className="menu-header__name">{profile?.name}!</p>
          </div>
        </div>
        <div className="menu-header__stats">
          <span className="stat-chip">⭐ {totalStars}</span>
          <span className="stat-chip">🏆 {unlockedBadges}</span>
        </div>
      </div>

      <h2 className="menu-screen__title">{s('Šta hoćeš da naučiš? 🎯')}</h2>

      <div className="module-grid">
        {MODULES.map(mod => {
          const earnedStars = mod.stars(progress);
          return (
            <button
              key={mod.id}
              className="module-card"
              style={{ '--card-color': mod.color, '--card-bg': mod.bg } as React.CSSProperties}
              onClick={() => navigate(mod.id)}
            >
              <span className="module-card__emoji">{mod.emoji}</span>
              <span className="module-card__label">{s(mod.label)}</span>
              <span className="module-card__desc">{s(mod.description)}</span>
              <span className="module-card__stars">
                ⭐ {earnedStars}{mod.maxStars ? ` / ${mod.maxStars}` : ''}
              </span>
            </button>
          );
        })}
      </div>

      <div className="menu-screen__footer">
        <Button variant="secondary" size="md" onClick={() => navigate('progress')} emoji="🏆">
          {s('Moj napredak')}
        </Button>
        <Button variant="ghost" size="sm" onClick={resetProfile}>
          {s('Promeni igrača')}
        </Button>
      </div>
    </div>
  );
};
