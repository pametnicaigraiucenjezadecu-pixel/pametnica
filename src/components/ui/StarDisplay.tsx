import React from 'react';

interface StarDisplayProps {
  count: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const StarDisplay: React.FC<StarDisplayProps> = ({
  count,
  max = 3,
  size = 'md',
  animate = false,
}) => {
  const fontSize = { sm: '1.2rem', md: '1.8rem', lg: '2.8rem' }[size];

  return (
    <div className="star-display" style={{ fontSize }}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`star ${i < count ? 'star--filled' : 'star--empty'} ${animate && i < count ? 'star--animate' : ''}`}
          style={{ animationDelay: animate ? `${i * 0.15}s` : '0s' }}
        >
          {i < count ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
};
