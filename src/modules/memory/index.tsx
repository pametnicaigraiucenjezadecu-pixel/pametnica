import React, { useState, useCallback, useEffect } from 'react';
import { MemoryCard } from './MemoryCard';
import { Button } from '../../components/ui/Button';
import { StarDisplay } from '../../components/ui/StarDisplay';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../context/AppContext';
import { useTimer } from '../../hooks/useTimer';
import { playSound } from '../../services/audio';
import { speakSr } from '../../services/speech';
import { ALL_MEMORY_CARDS, DIFFICULTY_CONFIG, STAR_THRESHOLDS } from '../../data/memoryCards';
import { t } from '../../data/translations';
import { useScript } from '../../hooks/useScript';
import type { MemoryCardInstance, Difficulty } from '../../types';

const useTrackModule = () => {
  const { trackModule } = useApp();
  useEffect(() => { trackModule('memory'); }, [trackModule]);
};

// ─── Shuffle helper ────────────────────────────────────────────────────────────
const shuffle = <T,>(arr: T[]): T[] =>
  [...arr].sort(() => Math.random() - 0.5);

// ─── Build card deck ──────────────────────────────────────────────────────────
const buildDeck = (difficulty: Difficulty): MemoryCardInstance[] => {
  const { pairs } = DIFFICULTY_CONFIG[difficulty];
  const selected = shuffle(ALL_MEMORY_CARDS).slice(0, pairs);
  const doubled = selected.flatMap(card => [
    { instanceId: `${card.id}-a`, cardData: card, isFlipped: false, isMatched: false },
    { instanceId: `${card.id}-b`, cardData: card, isFlipped: false, isMatched: false },
  ]);
  return shuffle(doubled);
};

// ─── Star calculation ─────────────────────────────────────────────────────────
const calcStars = (moves: number, difficulty: Difficulty): number => {
  const t = STAR_THRESHOLDS[difficulty];
  if (moves <= t.three) return 3;
  if (moves <= t.two)   return 2;
  return 1;
};

// ─── Component ────────────────────────────────────────────────────────────────
type GameState = 'selecting' | 'playing' | 'finished';

export const MemoryGame: React.FC = () => {
  useTrackModule();
  const { navigate, saveMemoryScore } = useApp();
  const s = useScript();
  const { seconds, start: startTimer, reset: resetTimer, formatTime } = useTimer();

  const [gameState, setGameState] = useState<GameState>('selecting');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [cards, setCards] = useState<MemoryCardInstance[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [stars, setStars] = useState(0);

  const { pairs, cols } = DIFFICULTY_CONFIG[difficulty];

  // ─── Start new game ──────────────────────────────────────────────────────
  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    setCards(buildDeck(diff));
    setFlippedIds([]);
    setMoves(0);
    setMatchedCount(0);
    setIsChecking(false);
    setStars(0);
    resetTimer();
    setGameState('playing');
    setTimeout(startTimer, 100);
  }, [startTimer, resetTimer]);

  // ─── Handle card flip ────────────────────────────────────────────────────
  const handleCardClick = useCallback((instanceId: string) => {
    if (isChecking || flippedIds.length >= 2) return;

    playSound('flip');

    const clickedCard = cards.find(c => c.instanceId === instanceId)!;
    speakSr(clickedCard.cardData.name);

    setCards(prev =>
      prev.map(c => c.instanceId === instanceId ? { ...c, isFlipped: true } : c)
    );

    const newFlipped = [...flippedIds, instanceId];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsChecking(true);

      const [idA, idB] = newFlipped;
      const cardA = cards.find(c => c.instanceId === idA)!;
      const cardB = cards.find(c => c.instanceId === idB)!;

      if (cardA.cardData.id === cardB.cardData.id) {
        // Match!
        playSound('correct');
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.instanceId === idA || c.instanceId === idB
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedIds([]);
          setIsChecking(false);
          setMatchedCount(m => m + 1);
        }, 600);
      } else {
        // No match — flip back
        playSound('wrong');
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.instanceId === idA || c.instanceId === idB
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedIds([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [cards, flippedIds, isChecking]);

  // ─── Detect win ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameState === 'playing' && matchedCount === pairs && pairs > 0) {
      playSound('level_complete');
      const earnedStars = calcStars(moves, difficulty);
      setStars(earnedStars);
      saveMemoryScore({ difficulty, moves, timeSeconds: seconds, stars: earnedStars });
      setTimeout(() => setGameState('finished'), 500);
    }
  }, [matchedCount, pairs, gameState, moves, difficulty, seconds, saveMemoryScore]);

  // ─── Selecting difficulty ────────────────────────────────────────────────
  if (gameState === 'selecting') {
    return (
      <div className="screen screen--centered">
        <div className="module-header">
          <Button variant="ghost" size="sm" onClick={() => navigate('menu')}>{s(t.btnBack)}</Button>
          <h2 className="module-header__title">{s(t.memoryTitle)}</h2>
          <div style={{ width: 64 }} />
        </div>

        <p className="select-label">{s(t.selectDifficulty)}</p>
        <div className="difficulty-grid">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
            <button
              key={d}
              className={`difficulty-card difficulty-card--${d}`}
              onClick={() => startGame(d)}
            >
              <span className="difficulty-card__emoji">{DIFFICULTY_CONFIG[d].emoji}</span>
              <span className="difficulty-card__label">{s(DIFFICULTY_CONFIG[d].label)}</span>
              <span className="difficulty-card__pairs">{DIFFICULTY_CONFIG[d].pairs} {s('parova')}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── Finished modal ──────────────────────────────────────────────────────
  const isFinished = gameState === 'finished';

  return (
    <div className="screen memory-screen">
      {/* HUD */}
      <div className="memory-hud">
        <Button variant="ghost" size="sm" onClick={() => setGameState('selecting')}>{s(t.btnBack)}</Button>
        <div className="memory-hud__stats">
          <span className="hud-chip">👆 {moves}</span>
          <span className="hud-chip">⏱ {formatTime(seconds)}</span>
          <span className="hud-chip">✅ {matchedCount}/{pairs}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => startGame(difficulty)}>🔄</Button>
      </div>

      {/* Card grid */}
      <div
        className="memory-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cards.map(card => (
          <MemoryCard
            key={card.instanceId}
            card={card}
            onClick={handleCardClick}
            disabled={isChecking || isFinished}
          />
        ))}
      </div>

      {/* Finished modal */}
      <Modal open={isFinished} showClose={false}>
        <div className="finish-modal">
          <div className="finish-modal__confetti">🎉</div>
          <h2 className="finish-modal__title">{s(t.memoryWinTitle)}</h2>
          <StarDisplay count={stars} max={3} size="lg" animate />
          <div className="finish-modal__stats">
            <span>{s(t.memoryMoves(moves))}</span>
            <span>⏱ {formatTime(seconds)}</span>
          </div>
          <div className="finish-modal__actions">
            <Button variant="primary" size="lg" onClick={() => startGame(difficulty)} emoji="🔄">
              {s(t.btnPlayAgain)}
            </Button>
            <Button variant="secondary" size="md" onClick={() => navigate('menu')}>
              {s(t.btnMenu)}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
