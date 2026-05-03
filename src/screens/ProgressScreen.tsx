import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { StarDisplay } from '../components/ui/StarDisplay';
import { t } from '../data/translations';
import { useScript } from '../hooks/useScript';

const DIFFICULTY_SR: Record<string, string> = {
  easy: 'Lako',
  medium: 'Srednje',
  hard: 'Teško',
};

export const ProgressScreen: React.FC = () => {
  const { state, navigate } = useApp();
  const s = useScript();
  const { progress } = state;

  if (!progress) return null;

  const {
    totalStars,
    badges,
    memoryScores,
    alphabetProgress,
    shadowScores,
  } = progress;

  const lettersLearned = alphabetProgress.learnedLetters.length;
  const bestMemory = memoryScores.length > 0
    ? memoryScores.reduce((best, s) => s.stars > best.stars ? s : best)
    : null;

  const totalShadowLevels = shadowScores.length;
  const unlockedBadges = badges.filter(b => b.unlockedAt);
  const lockedBadges = badges.filter(b => !b.unlockedAt);

  return (
    <div className="screen progress-screen">
      <div className="progress-screen__header">
        <h2 className="progress-screen__title">{s(t.progressTitle)}</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('menu')}>
          {s(t.btnBack)}
        </Button>
      </div>

      {/* Total stars */}
      <div className="progress-card progress-card--hero">
        <p className="progress-card__label">{s(t.progressTotalStars)}</p>
        <p className="progress-card__value">⭐ {totalStars}</p>
      </div>

      {/* Module summaries */}
      <div className="progress-modules">
        <div className="progress-stat-card" style={{ '--accent': '#A29BFE' } as React.CSSProperties}>
          <span className="progress-stat-card__icon">🔡</span>
          <div>
            <p className="progress-stat-card__title">{s(t.progressAlphabet)}</p>
            <p className="progress-stat-card__value">{s(t.progressLetters(lettersLearned))}</p>
            <div className="progress-bar">
              <div
                className="progress-bar__fill"
                style={{ width: `${(lettersLearned / 30) * 100}%`, background: '#A29BFE' }}
              />
            </div>
          </div>
        </div>

        <div className="progress-stat-card" style={{ '--accent': '#FF6B6B' } as React.CSSProperties}>
          <span className="progress-stat-card__icon">🧠</span>
          <div>
            <p className="progress-stat-card__title">{s(t.progressMemory)}</p>
            <p className="progress-stat-card__value">{s(t.progressGames(memoryScores.length))}</p>
            {bestMemory && (
              <p className="progress-stat-card__sub">
                {s(t.progressBest)} <StarDisplay count={bestMemory.stars} size="sm" /> ({s(DIFFICULTY_SR[bestMemory.difficulty] ?? bestMemory.difficulty)})
              </p>
            )}
          </div>
        </div>

        <div className="progress-stat-card" style={{ '--accent': '#4ECDC4' } as React.CSSProperties}>
          <span className="progress-stat-card__icon">🌑</span>
          <div>
            <p className="progress-stat-card__title">{s(t.progressShadow)}</p>
            <p className="progress-stat-card__value">{s(t.progressLevels(totalShadowLevels))}</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <h3 className="progress-section-title">{s(t.badgesTitle)}</h3>
      <div className="badge-grid">
        {unlockedBadges.map(badge => (
          <div key={badge.id} className="badge-item badge-item--unlocked">
            <span className="badge-item__emoji">{badge.emoji}</span>
            <span className="badge-item__name">{s(badge.name)}</span>
            <span className="badge-item__desc">{s(badge.description)}</span>
          </div>
        ))}
        {lockedBadges.map(badge => (
          <div key={badge.id} className="badge-item badge-item--locked">
            <span className="badge-item__emoji">🔒</span>
            <span className="badge-item__name">{s(badge.name)}</span>
            <span className="badge-item__desc">{s(badge.description)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
