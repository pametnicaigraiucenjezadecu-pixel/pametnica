import React from 'react';
import type { AlphabetItem } from '../../types';
import { speakSr } from '../../services/speech';
import { playSound } from '../../services/audio';
import { t } from '../../data/translations';
import { useScript } from '../../hooks/useScript';

interface LetterCardProps {
  item: AlphabetItem;
  isLearned: boolean;
  onClick: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ item, isLearned, onClick }) => {
  return (
    <button
      className={`letter-tile ${isLearned ? 'letter-tile--learned' : ''}`}
      onClick={onClick}
      aria-label={`Slovo ${item.letter} za ${item.word}`}
    >
      <span className="letter-tile__letter">{item.letter}</span>
      {isLearned && <span className="letter-tile__check">✓</span>}
    </button>
  );
};

// ─── Full Letter Focus Card ────────────────────────────────────────────────────
interface LetterFocusProps {
  item: AlphabetItem;
  isLearned: boolean;
  onLearn: () => void;
  onClose: () => void;
}

export const LetterFocusCard: React.FC<LetterFocusProps> = ({ item, isLearned, onLearn, onClose }) => {
  const s = useScript();

  const handleSpeak = () => {
    speakSr(t.letterPhrase(item.phoneme, item.word));
    playSound('click');
  };

  return (
    <div className="letter-focus-overlay" onClick={onClose}>
      <div className="letter-focus" onClick={e => e.stopPropagation()}>
        {/* The letter itself is NEVER transliterated — it IS the lesson subject */}
        <div className="letter-focus__letter">{item.letter}</div>
        <div className="letter-focus__emoji">{item.emoji}</div>
        <div className="letter-focus__word">
          <span className="letter-focus__highlight">{item.letter}</span>
          {s(item.word.slice(1))}
        </div>

        <button className="speak-btn" onClick={handleSpeak} aria-label="Čuj izgovor">
          {s(t.btnHear)}
        </button>

        {!isLearned ? (
          <button className="learn-btn" onClick={onLearn}>
            {s(t.btnLearned)}
          </button>
        ) : (
          <div className="learned-badge">{s(t.learnedBadge)}</div>
        )}

        <button className="letter-focus__close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};
