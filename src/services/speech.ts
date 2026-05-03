// ─── Sound ON/OFF preference ──────────────────────────────────────────────────
// Controls both Web Audio effects. Stored in localStorage.
const SOUND_KEY = 'kidlearn_sound';

let _enabled = (() => {
  try { return localStorage.getItem(SOUND_KEY) !== 'false'; } catch { return true; }
})();

export const isSoundEnabled = (): boolean => _enabled;

export const setSoundEnabled = (v: boolean): void => {
  _enabled = v;
  try { localStorage.setItem(SOUND_KEY, String(v)); } catch {}
};

export const toggleSound = (): boolean => {
  setSoundEnabled(!_enabled);
  return _enabled;
};
