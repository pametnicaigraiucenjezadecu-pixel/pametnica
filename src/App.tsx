import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { InstallPrompt } from './components/InstallPrompt';
import { HomeScreen } from './screens/HomeScreen';
import { WorldMapScreen } from './screens/WorldMapScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { SessionEndScreen } from './screens/SessionEndScreen';
import { AlphabetModule } from './modules/alphabet';
import { MemoryGame } from './modules/memory';
import { ShadowMatch } from './modules/shadow';

// ─── State-based router ───────────────────────────────────────────────────────
const Router: React.FC = () => {
  const { state } = useApp();
  const key = state.currentScreen;

  const screen = (() => {
    switch (key) {
      case 'home':        return <HomeScreen />;
      case 'menu':        return <WorldMapScreen />;
      case 'alphabet':    return <AlphabetModule />;
      case 'memory':      return <MemoryGame />;
      case 'shadow':      return <ShadowMatch />;
      case 'progress':    return <ProgressScreen />;
      case 'session-end': return <SessionEndScreen />;
      default:            return <HomeScreen />;
    }
  })();

  return <div key={key} className="route-wrapper">{screen}</div>;
};

// Separate component so it can read uiMode from context
const AppShell: React.FC = () => {
  const { state } = useApp();
  return (
    <div className="app-shell" data-ui-mode={state.uiMode}>
      <Router />
      <InstallPrompt />
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppShell />
  </AppProvider>
);

export default App;
