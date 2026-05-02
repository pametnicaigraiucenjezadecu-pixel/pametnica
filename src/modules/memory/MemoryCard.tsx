import React from 'react';
import type { MemoryCardInstance } from '../../types';

interface MemoryCardProps {
  card: MemoryCardInstance;
  onClick: (instanceId: string) => void;
  disabled: boolean;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ card, onClick, disabled }) => {
  const { instanceId, cardData, isFlipped, isMatched } = card;

  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick(instanceId);
    }
  };

  return (
    <div
      className={`memory-card ${isFlipped || isMatched ? 'memory-card--flipped' : ''} ${isMatched ? 'memory-card--matched' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={isFlipped ? cardData.name : 'Hidden card'}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      <div className="memory-card__inner">
        {/* Back (hidden side) */}
        <div className="memory-card__face memory-card__back">
          <span className="memory-card__pattern">❓</span>
        </div>
        {/* Front (revealed side) */}
        <div className="memory-card__face memory-card__front">
          <span className="memory-card__emoji">{cardData.emoji}</span>
          <span className="memory-card__name">{cardData.name}</span>
        </div>
      </div>
    </div>
  );
};
