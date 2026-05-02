import React from 'react';
import { useApp } from '../context/AppContext';
import type { UiMode } from '../types';

export const UiModeToggle: React.FC = () => {
  const { state, setUiMode } = useApp();
  const { uiMode } = state;

  const options: { value: UiMode; icon: string; label: string }[] = [
    { value: 'ios',     icon: '',  label: 'iOS'   },
    { value: 'android', icon: '🤖', label: 'Droid' },
  ];

  return (
    <div className="ui-mode-toggle" role="group" aria-label="UI stil">
      {options.map(opt => (
        <button
          key={opt.value}
          className={`ui-mode-btn${uiMode === opt.value ? ' ui-mode-btn--active' : ''}`}
          onClick={() => setUiMode(opt.value)}
          title={opt.value === 'ios' ? 'iOS stil' : 'Android stil'}
        >
          <span className="ui-mode-btn__icon">{opt.icon}</span>
          {opt.label}
        </button>
      ))}
    </div>
  );
};
