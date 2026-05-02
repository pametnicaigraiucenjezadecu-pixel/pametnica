// ─── Sound ON/OFF preference ──────────────────────────────────────────────────
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

// ─── Serbian voice selection ──────────────────────────────────────────────────
let _voice: SpeechSynthesisVoice | null = null;

const LANG_PRIORITY = ['sr', 'hr', 'bs', 'sl', 'cs', 'sk', 'pl', 'ru', 'uk', 'bg'];

function pickBestVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return;

  for (const prefix of LANG_PRIORITY) {
    const match = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    if (match) { _voice = match; return; }
  }
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.addEventListener('voiceschanged', pickBestVoice);
  pickBestVoice();
}

// ─── Serbian TTS ──────────────────────────────────────────────────────────────
export const speakSr = (text: string): void => {
  if (!_enabled) return;
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  if (_voice) {
    utt.voice = _voice;
    utt.lang = _voice.lang;
  } else {
    utt.lang = 'sr-RS';
  }
  utt.rate = 0.88;
  utt.pitch = 1.1;
  utt.volume = 1;
  window.speechSynthesis.speak(utt);
};
