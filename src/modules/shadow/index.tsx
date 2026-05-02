import React, { useState, useCallback, useEffect } from 'react';
import { SHADOW_LEVELS } from '../../data/shadowItems';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { StarDisplay } from '../../components/ui/StarDisplay';
import { SvgSilhouette } from '../../components/SvgSilhouette';
import type { ShadowId } from '../../components/SvgSilhouette';
import { playSound } from '../../services/audio';
import { speakSr } from '../../services/speech';
import { t } from '../../data/translations';
import { useScript } from '../../hooks/useScript';
import type { ShadowItem } from '../../types';

type RoundState = 'playing' | 'correct' | 'wrong';

export const ShadowMatch: React.FC = () => {
  const { navigate, saveShadowScore, trackModule } = useApp();
  const s = useScript();
  useEffect(() => { trackModule('shadow'); }, [trackModule]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roundState, setRoundState] = useState<RoundState>('playing');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<ShadowItem[]>(() =>
    [...SHADOW_LEVELS[0].options].sort(() => Math.random() - 0.5)
  );

  const level = SHADOW_LEVELS[currentIndex];

  const handleSelect = useCallback((item: ShadowItem) => {
    if (roundState !== 'playing') return;
    setSelectedId(item.id);
    setTotalCount(tc => tc + 1);

    const isCorrect = item.id === level.target.id;
    if (isCorrect) {
      playSound('correct');
      speakSr(t.shadowSpeakCorrect(level.target.name));
      setCorrectCount(c => c + 1);
      setRoundState('correct');
    } else {
      playSound('wrong');
      speakSr(t.shadowSpeakWrong(level.target.name));
      setRoundState('wrong');
    }

    setTimeout(() => {
      if (isCorrect) {
        if (currentIndex + 1 >= SHADOW_LEVELS.length) {
          playSound('complete');
          const acc = Math.round(((correctCount + 1) / (totalCount + 1)) * 100);
          const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : 1;
          saveShadowScore({ level: SHADOW_LEVELS.length, accuracy: acc, stars });
          setFinished(true);
        } else {
          const nextLevel = SHADOW_LEVELS[currentIndex + 1];
          setCurrentIndex(i => i + 1);
          setShuffledOptions([...nextLevel.options].sort(() => Math.random() - 0.5));
          setRoundState('playing');
          setSelectedId(null);
        }
      } else {
        setShuffledOptions(prev => [...prev].sort(() => Math.random() - 0.5));
        setRoundState('playing');
        setSelectedId(null);
      }
    }, 1200);
  }, [roundState, level, currentIndex, correctCount, totalCount, saveShadowScore]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setRoundState('playing');
    setSelectedId(null);
    setCorrectCount(0);
    setTotalCount(0);
    setFinished(false);
    setShuffledOptions([...SHADOW_LEVELS[0].options].sort(() => Math.random() - 0.5));
  };

  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const finalStars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;

  if (finished) {
    return (
      <div className="screen screen--centered">
        <div className="finish-modal">
          <div className="finish-modal__confetti">🎉</div>
          <h2 className="finish-modal__title">{s(t.shadowDoneTitle)}</h2>
          <p className="finish-modal__sub">{s(t.shadowAccuracy(accuracy))}</p>
          <StarDisplay count={finalStars} max={3} size="lg" animate />
          <div className="finish-modal__actions">
            <Button variant="primary" size="lg" onClick={handleRestart} emoji="🔄">
              {s(t.btnPlayAgain)}
            </Button>
            <Button variant="secondary" size="md" onClick={() => navigate('menu')}>
              {s(t.btnMenu)}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen shadow-screen">
      {/* Header */}
      <div className="module-header">
        <Button variant="ghost" size="sm" onClick={() => navigate('menu')}>{s(t.btnBack)}</Button>
        <div className="module-header__center">
          <h2 className="module-header__title">{s(t.shadowTitle)}</h2>
          <p className="module-header__sub">{s(t.shadowLevel(currentIndex + 1, SHADOW_LEVELS.length))}</p>
        </div>
        <div style={{ width: 64 }} />
      </div>

      {/* Progress dots */}
      <div className="level-dots">
        {SHADOW_LEVELS.map((_, i) => (
          <span
            key={i}
            className={`level-dot ${i < currentIndex ? 'level-dot--done' : i === currentIndex ? 'level-dot--current' : ''}`}
          />
        ))}
      </div>

      {/* Instruction */}
      <p className="shadow-instruction">
        {roundState === 'correct' ? s(t.shadowCorrect) : roundState === 'wrong' ? s(t.shadowWrong) : s(t.shadowInstruction)}
      </p>

      {/* Target object */}
      <div className="shadow-target-area">
        <div className="shadow-target">
          <span className="shadow-target__emoji">{level.target.emoji}</span>
          <span className="shadow-target__label">{s(level.target.name)}</span>
        </div>
        <div className="shadow-arrow">👇</div>
      </div>

      {/* Shadow options */}
      <div className={`shadow-options shadow-options--${shuffledOptions.length}`}>
        {shuffledOptions.map(item => {
          const isSelected = selectedId === item.id;
          const isTarget = item.id === level.target.id;
          let stateClass = '';
          if (isSelected && roundState === 'correct') stateClass = 'shadow-option--correct';
          else if (isSelected && roundState === 'wrong') stateClass = 'shadow-option--wrong';
          else if (!isSelected && roundState === 'correct' && isTarget) stateClass = 'shadow-option--correct';

          return (
            <button
              key={item.id}
              className={`shadow-option ${stateClass}`}
              onClick={() => handleSelect(item)}
              disabled={roundState !== 'playing'}
              aria-label={s(item.name)}
            >
              <SvgSilhouette id={item.id as ShadowId} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
