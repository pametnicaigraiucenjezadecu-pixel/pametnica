import { toCyrillic, toLatin } from '../utils/transliterate';

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

// Prefer Slavic voices; sr first, then phonetically closest relatives
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

// ─── Script detection ─────────────────────────────────────────────────────────
// Languages that use Cyrillic script — voice input must be Cyrillic for these
const CYRILLIC_PREFIXES = ['sr', 'bg', 'ru', 'uk', 'mk', 'be'];
// Explicit Latin overrides inside Serbian locale
const LATIN_OVERRIDES   = ['sr-latn', 'sr_latn'];

function voiceUsesCyrillic(): boolean {
  if (!_voice) return true; // no voice found → utt.lang='sr-RS', assume Cyrillic
  const lang = _voice.lang.toLowerCase();
  if (LATIN_OVERRIDES.some(p => lang.startsWith(p))) return false;
  return CYRILLIC_PREFIXES.some(p => lang.startsWith(p));
}

/**
 * Normalise text to match the active TTS voice's script.
 *
 * Problem: ALPHABET_DATA stores phonemes in Cyrillic ('А') and words in Latin
 * ('Avion'). When mixed text like "А. Reč je Avion" reaches a Croatian voice
 * (Latin), the Cyrillic 'А' is mispronounced. Conversely, Cyrillic voices
 * stumble on unmapped Latin diacritics.
 *
 * Fix: convert the whole string to whichever script the selected voice speaks.
 */
export const normalizeSpeechText = (text: string): string =>
  voiceUsesCyrillic() ? toCyrillic(text) : toLatin(text);

// ─── Serbian TTS ──────────────────────────────────────────────────────────────
export const speakSr = (text: string): void => {
  if (!_enabled) return;
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const normalized = normalizeSpeechText(text);
  const utt = new SpeechSynthesisUtterance(normalized);

  if (_voice) {
    utt.voice = _voice;
    utt.lang  = _voice.lang;
  } else {
    utt.lang = 'sr-RS';
  }

  utt.rate   = 0.88;
  utt.pitch  = 1.1;
  utt.volume = 1;

  window.speechSynthesis.speak(utt);
};
