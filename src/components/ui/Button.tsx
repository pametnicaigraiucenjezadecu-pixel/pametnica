import React from 'react';
import { playSound } from '../../services/audio';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  emoji?: string;
  soundOnClick?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  emoji,
  soundOnClick = true,
  children,
  onClick,
  className = '',
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (soundOnClick) playSound('click');
    onClick?.(e);
  };

  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {emoji && <span className="btn__emoji">{emoji}</span>}
      {children}
    </button>
  );
};
