import React, { useState, useEffect } from 'react';
import { ALPHABET_DATA } from '../../data/alphabet';
import { useApp } from '../../context/AppContext';
import { LetterCard, LetterFocusCard } from './LetterCard';
import { Button } from '../../components/ui/Button';
import { speakSr } from '../../services/speech';
import { t } from '../../data/translations';
import { useScript } from '../../hooks/useScript';
import type { AlphabetItem } from '../../types';

export const AlphabetModule: React.FC = () => {
  const { state, navigate, learnLetter, trackModule } = useApp();
  const s = useScript();
  const [focused, setFocused] = useState<AlphabetItem | null>(null);
  const [justLearned, setJustLearned] = useState<string | null>(null);

  useEffect(() => { trackModule('alphabet'); }, [trackModule]);

  const learned = state.progress?.alphabetProgress.learnedLetters ?? [];
  const learnedCount = learned.length;

  const handleTileClick = (item: AlphabetItem) => {
    speakSr(item.phoneme);
    setFocused(item);
  };

  const handleLearn = (letter: string) => {
    if (!learned.includes(letter)) {
      learnLetter(letter);
      setJustLearned(letter);
      setTimeout(() => setJustLearned(null), 2000);
    }
    setFocused(null);
  };

  return (
    <div className="screen alphabet-screen">
      {/* Header */}
      <div className="module-header">
        <Button variant="ghost" size="sm" onClick={() => navigate('menu')}>{s(t.btnBack)}</Button>
        <div className="module-header__center">
          <h2 className="module-header__title">{s(t.alphabetTitle)}</h2>
          <p className="module-header__sub">{s(t.alphabetProgress(learnedCount))}</p>
        </div>
        <div style={{ width: 64 }} />
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ margin: '0 16px 16px' }}>
        <div
          className="progress-bar__fill"
          style={{ width: `${(learnedCount / 26) * 100}%`, background: '#A29BFE' }}
        />
      </div>

      {/* Just-learned toast */}
      {justLearned && (
        <div className="toast toast--success">
          {s(t.toastLearned(justLearned))}
        </div>
      )}

      {/* Letter grid */}
      <div className="letter-grid">
        {ALPHABET_DATA.map(item => (
          <LetterCard
            key={item.letter}
            item={item}
            isLearned={learned.includes(item.letter)}
            onClick={() => handleTileClick(item)}
          />
        ))}
      </div>

      {/* Focus overlay */}
      {focused && (
        <LetterFocusCard
          item={focused}
          isLearned={learned.includes(focused.letter)}
          onLearn={() => handleLearn(focused.letter)}
          onClose={() => setFocused(null)}
        />
      )}

      {/* Completion banner */}
      {learnedCount === 26 && (
        <div className="completion-banner">
          {s(t.alphabetComplete)}
        </div>
      )}
    </div>
  );
};
