import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './index.css';
import App from './App.tsx';

// Register service worker — auto-updates silently in background
registerSW({
  onNeedRefresh() {
    // New content available — auto-update without prompting user (children's app)
  },
  onOfflineReady() {
    console.info('[Pametnica] App is ready for offline use.');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
