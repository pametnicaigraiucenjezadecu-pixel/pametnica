import React from 'react';
import type { AlphabetItem } from '../../types';
import { speakSr } from '../../services/speech';
import { playSound } from '../../services/audio';
import { t } from '../../data/translations';
import { useScript } from '../../hooks/useScript';
import { useApp } from '../../context/AppContext';
import { toLatin } from '../../utils/transliterate';

interface LetterCardProps {
  item: AlphabetItem;
  isLearned: boolean;
  onClick: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ item, isLearned, onClick }) => {
  const { state } = useApp();
  const displayLetter = state.script === 'cyrillic' ? item.letter : toLatin(item.letter);

  return (
    <button
      className={`letter-tile ${isLearned ? 'letter-tile--learned' : ''}`}
      onClick={onClick}
      aria-label={`Slovo ${item.letter} za ${item.word}`}
    >
      <span className="letter-tile__letter">{displayLetter}</span>
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
  const { state } = useApp();
  // Digraphs Lj, Nj, Dž occupy 2 chars — must highlight both together
  const digraphLen = /^(?:Lj|LJ|lj|Nj|NJ|nj|Dž|DŽ|dž)/.test(item.word) ? 2 : 1;
  const displayLetter = state.script === 'cyrillic' ? item.letter : toLatin(item.letter);

  const handleSpeak = () => {
    speakSr(t.letterPhrase(item.phoneme, item.word));
    playSound('click');
  };

  return (
    <div className="letter-focus-overlay" onClick={onClose}>
      <div className="letter-focus" onClick={e => e.stopPropagation()}>
        <div className="letter-focus__letter">{displayLetter}</div>
        <div className="letter-focus__emoji">{item.emoji}</div>
        <div className="letter-focus__word">
          <span className="letter-focus__highlight">{s(item.word.slice(0, digraphLen))}</span>
          {s(item.word.slice(digraphLen))}
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
