import React from 'react';
import { useApp } from '../context/AppContext';
import { StarDisplay } from '../components/ui/StarDisplay';
import { Button } from '../components/ui/Button';
import { formatDuration } from '../services/session';
import { t } from '../data/translations';
import { useScript } from '../hooks/useScript';

const AVATARS = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐨', '🦁', '🐵', '🐸', '🐧'];

export const SessionEndScreen: React.FC = () => {
  const { state, navigate, resetProfile } = useApp();
  const s = useScript();
  const { profile, progress, activeSession } = state;

  const avatar = AVATARS[profile?.avatarIndex ?? 0];
  const starsToday = activeSession?.starsEarned ?? 0;
  const durationApprox = activeSession
    ? Math.floor((Date.now() - new Date(activeSession.startedAt).getTime()) / 1000)
    : 0;
  const modulesPlayed = activeSession?.modulesPlayed ?? [];
  const streak = progress?.streak;
  const totalStars = progress?.totalStars ?? 0;

  const sessionStars = starsToday >= 9 ? 3 : starsToday >= 4 ? 2 : starsToday >= 1 ? 1 : 0;

  const moduleLabel: Record<string, string> = {
    memory:   t.moduleMemory,
    alphabet: t.moduleAlphabet,
    shadow:   t.moduleShadow,
  };

  return (
    <div className="screen session-end-screen">
      <div className="session-end__card">
        <div className="session-end__avatar">{avatar}</div>
        <h2 className="session-end__title">{s(t.sessionTitle(profile?.name ?? ''))}</h2>
        <p className="session-end__sub">{s(t.sessionSub)}</p>

        {/* Session stats */}
        <div className="session-stats">
          <div className="session-stat">
            <span className="session-stat__icon">⭐</span>
            <span className="session-stat__value">{starsToday}</span>
            <span className="session-stat__label">{s(t.sessionStarsLabel)}</span>
          </div>
          <div className="session-stat">
            <span className="session-stat__icon">⏱</span>
            <span className="session-stat__value">{formatDuration(durationApprox)}</span>
            <span className="session-stat__label">{s(t.sessionTimeLabel)}</span>
          </div>
          <div className="session-stat">
            <span className="session-stat__icon">🎮</span>
            <span className="session-stat__value">{modulesPlayed.length}</span>
            <span className="session-stat__label">{s(t.sessionWorldsLabel)}</span>
          </div>
        </div>

        {starsToday > 0 && (
          <div className="session-end__rating">
            <p>{s(t.sessionRating)}</p>
            <StarDisplay count={sessionStars} max={3} size="lg" animate />
          </div>
        )}

        {modulesPlayed.length > 0 && (
          <div className="session-end__modules">
            {modulesPlayed.map(id => (
              <span key={id} className="session-module-chip">{s(moduleLabel[id])}</span>
            ))}
          </div>
        )}

        {streak && streak.current > 0 && (
          <div className="session-end__streak">
            {s(t.sessionStreak(streak.current))}
          </div>
        )}

        <p className="session-end__total">{s(t.sessionTotal(totalStars))}</p>

        <div className="session-end__actions">
          <Button variant="primary" size="lg" onClick={() => navigate('menu')} emoji="🎮">
            {s(t.btnKeepPlaying)}
          </Button>
          <Button variant="ghost" size="md" onClick={resetProfile}>
            {s(t.btnChangePlayer)}
          </Button>
        </div>
      </div>
    </div>
  );
};
