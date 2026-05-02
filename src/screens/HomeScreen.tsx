import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { playSound } from '../services/audio';
import { t } from '../data/translations';
import { useScript } from '../hooks/useScript';

const AVATARS = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐨', '🦁', '🐵', '🐸', '🐧'];

export const HomeScreen: React.FC = () => {
  const { createProfile } = useApp();
  const s = useScript();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [step, setStep] = useState<'welcome' | 'setup'>('welcome');
  const [error, setError] = useState('');

  const handleStart = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError(t.errorNameShort);
      return;
    }
    if (trimmed.length > 20) {
      setError(t.errorNameLong);
      return;
    }
    createProfile(trimmed, selectedAvatar);
  };

  if (step === 'welcome') {
    return (
      <div className="screen screen--centered home-welcome">
        <div className="home-welcome__logo">
          <img src="/logo.svg" alt="Pametnica logo" className="home-welcome__logo-img" />
          <h1 className="home-welcome__title">{t.appName}</h1>
          <p className="home-welcome__subtitle">{s(t.homeTagline)}</p>
        </div>
        <div className="home-welcome__stars">
          {['⭐', '🌟', '✨', '⭐', '🌟'].map((star, i) => (
            <span key={i} className="floating-star" style={{ animationDelay: `${i * 0.3}s` }}>{star}</span>
          ))}
        </div>
        <Button
          variant="primary"
          size="xl"
          onClick={() => { playSound('click'); setStep('setup'); }}
          soundOnClick={false}
        >
          {s(t.homeStart)}
        </Button>
      </div>
    );
  }

  return (
    <div className="screen screen--centered setup-screen">
      <h2 className="setup-screen__title">{s(t.setupTitle)}</h2>

      {/* Name input */}
      <div className="setup-screen__input-group">
        <label className="setup-screen__label">{s(t.setupLabelName)}</label>
        <input
          className="setup-screen__input"
          type="text"
          placeholder={s(t.setupPlaceholder)}
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
          maxLength={20}
          autoFocus
          onKeyDown={e => e.key === 'Enter' && handleStart()}
        />
        {error && <p className="setup-screen__error">{s(error)}</p>}
      </div>

      {/* Avatar picker */}
      <div className="setup-screen__section">
        <label className="setup-screen__label">{s(t.setupLabelAvatar)}</label>
        <div className="avatar-grid">
          {AVATARS.map((emoji, i) => (
            <button
              key={i}
              className={`avatar-btn ${selectedAvatar === i ? 'avatar-btn--selected' : ''}`}
              onClick={() => { setSelectedAvatar(i); playSound('click'); }}
              aria-label={`Avatar ${i + 1}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <Button variant="primary" size="xl" onClick={handleStart} emoji="🎮">
        {s(t.btnPlay)}
      </Button>

      <button className="back-link" onClick={() => setStep('welcome')}>
        {s(t.btnBack)}
      </button>
    </div>
  );
};
