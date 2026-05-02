import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'pametnica_install_dismissed';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Small delay so it doesn't pop up immediately on first load
      setTimeout(() => setVisible(true), 2500);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  if (!visible || !deferredPrompt) return null;

  return (
    <div className="install-prompt" role="dialog" aria-label="Instaliraj aplikaciju">
      <div className="install-prompt__content">
        <img src="/logo.svg" alt="Pametnica" className="install-prompt__logo" />
        <div className="install-prompt__text">
          <strong className="install-prompt__title">Instaliraj Pametnica</strong>
          <span className="install-prompt__sub">Radi i bez interneta! 🎮</span>
        </div>
        <button className="install-prompt__btn" onClick={handleInstall}>
          Instaliraj
        </button>
        <button
          className="install-prompt__close"
          onClick={handleDismiss}
          aria-label="Zatvori"
        >✕</button>
      </div>
    </div>
  );
};
