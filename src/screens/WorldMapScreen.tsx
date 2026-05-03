import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { isSoundEnabled, toggleSound } from '../services/speech';
import { t } from '../data/translations';
import { useScript } from '../hooks/useScript';
import { ResumePrompt } from '../components/ResumePrompt';
import type { WorldStatus, WorldId } from '../types';

const AVATARS = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐨', '🦁', '🐵', '🐸', '🐧'];

// ─── Single world node ────────────────────────────────────────────────────────
const WorldNode: React.FC<{
  world: WorldStatus;
  index: number;
  onPlay: (id: WorldId) => void;
}> = ({ world, index, onPlay }) => {
  const s = useScript();
  const { state } = useApp();

  const pct = world.starsTotal > 0
    ? Math.min((world.starsEarned / world.starsTotal) * 100, 100)
    : 0;

  // Alphabet tagline is script-sensitive: "Nauči azbuku!" vs "Nauči abecedu!"
  const tagline = world.id === 'alphabet'
    ? s(t.alphabetTagline(state.script))
    : s(world.tagline);

  return (
    <div
      className={`world-node ${world.unlocked ? 'world-node--unlocked' : 'world-node--locked'} ${world.completed ? 'world-node--completed' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {index > 0 && <div className="world-connector" />}

      <button
        className="world-bubble"
        style={{ background: world.bgGradient, '--world-color': world.color } as React.CSSProperties}
        onClick={() => world.unlocked && onPlay(world.id)}
        disabled={!world.unlocked}
        aria-label={world.unlocked ? s(`Igraj ${world.name}`) : `${s(world.name)} — ${s(world.unlockHint)}`}
      >
        <span className="world-bubble__emoji">{world.unlocked ? world.emoji : '🔒'}</span>
        {world.completed && <span className="world-bubble__crown">👑</span>}
      </button>

      <div className="world-info">
        <h3 className="world-info__name">{s(world.name)}</h3>
        <p className="world-info__tagline">{world.unlocked ? tagline : s(world.unlockHint)}</p>

        {world.unlocked && (
          <>
            <div className="world-progress-bar">
              <div
                className="world-progress-bar__fill"
                style={{ width: `${pct}%`, background: world.color }}
              />
            </div>
            <p className="world-info__stars">⭐ {world.starsEarned} / {world.starsTotal}</p>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Notification toast ────────────────────────────────────────────────────────
const NotificationToast: React.FC = () => {
  const { state, dismissNotification } = useApp();
  const s = useScript();
  const top = state.notifications[0];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!top) return;
    timerRef.current = setTimeout(() => dismissNotification(top.id), 3500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [top?.id, dismissNotification]);

  if (!top) return null;

  return (
    <div className="notif-toast" onClick={() => dismissNotification(top.id)}>
      <span className="notif-toast__emoji">{top.emoji}</span>
      <div>
        <p className="notif-toast__title">{s(top.title)}</p>
        <p className="notif-toast__msg">{s(top.message)}</p>
      </div>
    </div>
  );
};

// ─── World Map Screen ─────────────────────────────────────────────────────────
export const WorldMapScreen: React.FC = () => {
  const { state, navigate, trackModule, setScript } = useApp();
  const { profile, progress, worlds, activeSession, script } = state;
  const avatar = AVATARS[profile?.avatarIndex ?? 0];
  const streak = progress?.streak;
  const sessionStars = activeSession?.starsEarned ?? 0;
  const s = useScript();

  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const bgStars = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      size: `${0.5 + Math.random() * 0.6}rem`,
    })),
  []);

  const handlePlay = (id: WorldId) => {
    trackModule(id);
    navigate(id);
  };

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  return (
    <div className="screen worldmap-screen">
      {/* Brand bar */}
      <div className="wm-brand" aria-label="Pametnica">
        <img src="/logo.svg" alt="Pametnica logo" className="wm-brand__logo" />
        <span className="wm-brand__name">Pametnica</span>
        <span className="wm-autosave" title={s('Napredak se automatski čuva')}>✓ {s('Sačuvano')}</span>
      </div>

      {/* Decorative stars */}
      <div className="wm-stars" aria-hidden="true">
        {bgStars.map(star => (
          <span
            key={star.id}
            className="wm-star"
            style={{ left: star.left, top: star.top, animationDelay: star.delay, fontSize: star.size }}
          >✦</span>
        ))}
      </div>

      {/* Header */}
      <div className="wm-header">
        <div className="wm-header__profile">
          <span className="wm-header__avatar">{avatar}</span>
          <div>
            <p className="wm-header__name">{profile?.name}</p>
            {streak && streak.current > 0 && (
              <p className="wm-header__streak">{s(t.streak(streak.current))}</p>
            )}
          </div>
        </div>
        <div className="wm-header__chips">
          <span className="wm-chip">⭐ {progress?.totalStars ?? 0}</span>
          {sessionStars > 0 && <span className="wm-chip wm-chip--session">+{sessionStars} {s('danas')}</span>}
        </div>
      </div>

      {/* Script + UI mode + sound controls */}
      <div className="wm-controls">
        <div className="script-toggle">
          <button
            className={`script-btn${script === 'latin' ? ' script-btn--active' : ''}`}
            onClick={() => setScript('latin')}
          >Lat</button>
          <button
            className={`script-btn${script === 'cyrillic' ? ' script-btn--active' : ''}`}
            onClick={() => setScript('cyrillic')}
          >Ћир</button>
        </div>
        <button className="sound-toggle" onClick={handleToggleSound} title={soundOn ? 'Isključi zvuk' : 'Uključi zvuk'}>
          {soundOn ? t.soundOn : t.soundOff}
        </button>
      </div>

      <h2 className="wm-title">{s(t.worldMapTitle)}</h2>

      {/* World nodes */}
      <div className="world-list">
        {worlds.map((world, i) => (
          <WorldNode key={world.id} world={world} index={i} onPlay={handlePlay} />
        ))}
      </div>

      {/* Footer nav */}
      <div className="wm-footer">
        <button className="wm-nav-btn" onClick={() => navigate('progress')}>
          {s(t.btnProgress)}
        </button>
        <button className="wm-nav-btn wm-nav-btn--ghost" onClick={() => navigate('session-end')}>
          {s(t.btnEndSession)}
        </button>
      </div>

      {/* Notification overlay */}
      <NotificationToast />

      {/* Resume prompt — shown if there's an interrupted game */}
      <ResumePrompt />
    </div>
  );
};
