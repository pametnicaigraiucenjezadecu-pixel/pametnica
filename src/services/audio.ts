// ─── Web Speech API — delegates to Serbian speech service ────────────────────
export { speakSr as speak } from './speech';

// ─── Web Audio API — sound effects ────────────────────────────────────────────
type SoundType = 'correct' | 'wrong' | 'complete' | 'flip' | 'click' | 'level_complete';

let _audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  try {
    if (_audioCtx && _audioCtx.state !== 'closed') {
      if (_audioCtx.state === 'suspended') void _audioCtx.resume();
      return _audioCtx;
    }
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    _audioCtx = new Ctx();
    return _audioCtx;
  } catch {
    return null;
  }
};

const tone = (
  ctx: AudioContext,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = 'sine',
  gain = 0.25
): void => {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.connect(g);
  g.connect(ctx.destination);
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + dur + 0.01);
};

export const playSound = (type: SoundType): void => {
  const ctx = getAudioContext();
  if (!ctx) return;

  switch (type) {
    case 'click':
      tone(ctx, 600, 0, 0.08, 'sine', 0.12);
      break;

    case 'flip':
      tone(ctx, 440, 0,    0.06, 'triangle', 0.15);
      tone(ctx, 550, 0.06, 0.06, 'triangle', 0.1);
      break;

    case 'correct':
      // Cartoon "ding ding!" — quick bright arpeggio, triangle = toy-like
      tone(ctx, 523,  0,    0.07, 'triangle', 0.28); // C5
      tone(ctx, 659,  0.06, 0.07, 'triangle', 0.26); // E5
      tone(ctx, 784,  0.12, 0.07, 'triangle', 0.24); // G5
      tone(ctx, 1047, 0.18, 0.22, 'triangle', 0.32); // C6 — held
      break;

    case 'wrong':
      // Gentle "uh-oh" — soft descending, no harsh buzzer for kids
      tone(ctx, 392, 0,    0.12, 'triangle', 0.18); // G4
      tone(ctx, 330, 0.10, 0.20, 'triangle', 0.13); // E4
      break;

    case 'complete':
    case 'level_complete':
      // Grand cartoon fanfare
      tone(ctx, 523,  0,    0.09, 'triangle', 0.30); // C5
      tone(ctx, 659,  0.08, 0.09, 'triangle', 0.28); // E5
      tone(ctx, 784,  0.16, 0.09, 'triangle', 0.28); // G5
      tone(ctx, 1047, 0.24, 0.12, 'triangle', 0.32); // C6
      tone(ctx, 784,  0.34, 0.07, 'triangle', 0.24); // G5 bounce
      tone(ctx, 1047, 0.40, 0.10, 'triangle', 0.32); // C6
      tone(ctx, 1319, 0.48, 0.55, 'triangle', 0.35); // E6 final
      tone(ctx, 523,  0.24, 0.45, 'sine',     0.14); // bass C5
      break;
  }
};
