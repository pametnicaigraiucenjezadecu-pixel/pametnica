import React from 'react';
import { useApp } from '../context/AppContext';
import type { SavedGameState } from '../types';

const MODULE_INFO: Record<SavedGameState['screen'], { name: string; emoji: string; desc: string }> = {
  memory:   { name: 'Igra pamćenja', emoji: '🧠', desc: 'Nastavi da sparuješ kartice' },
  alphabet: { name: 'Svet slova',    emoji: '🔤', desc: 'Nastavi sa učenjem slova' },
  shadow:   { name: 'Igra senki',    emoji: '🌑', desc: 'Nastavi da tražiš senke' },
};

const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (days  > 0) return `pre ${days} ${days === 1 ? 'dan' : 'dana'}`;
  if (hours > 0) return `pre ${hours}h`;
  if (mins  > 0) return `pre ${mins} min`;
  return 'malopre';
};

export const ResumePrompt: React.FC = () => {
  const { state, navigate } = useApp();
  const { savedGameState } = state;

  if (!savedGameState) return null;

  const info = MODULE_INFO[savedGameState.screen];

  const handleResume = () => navigate(savedGameState.screen);
  // navigate('menu') triggers CLEAR_SAVED_GAME automatically in AppContext
  const handleNew    = () => navigate('menu');

  return (
    <div className="resume-backdrop" role="dialog" aria-modal="true" aria-label="Nađeno prethodno igranje">
      <div className="resume-card">
        <div className="resume-card__icon">{info.emoji}</div>

        <div className="resume-card__body">
          <p className="resume-card__eyebrow">Nađeno je prethodno igranje</p>
          <h2 className="resume-card__title">{info.name}</h2>
          <p className="resume-card__sub">{info.desc}</p>
          <p className="resume-card__time">⏱ Sačuvano {timeAgo(savedGameState.savedAt)}</p>
        </div>

        <div className="resume-card__actions">
          <button className="resume-btn resume-btn--primary" onClick={handleResume}>
            ▶ Nastavi igru
          </button>
          <button className="resume-btn resume-btn--ghost" onClick={handleNew}>
            🔄 Nova igra
          </button>
        </div>

        <p className="resume-card__hint">✓ Tvoj napredak je sačuvan</p>
      </div>
    </div>
  );
};
