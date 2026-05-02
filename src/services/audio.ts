// ─── Web Speech API — delegates to Serbian speech service ────────────────────
export { speakSr as speak } from './speech';

// ─── Web Audio API — sound effects ────────────────────────────────────────────
type SoundType = 'correct' | 'wrong' | 'complete' | 'flip' | 'click';

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
      tone(ctx, 523, 0,    0.12); // C5
      tone(ctx, 659, 0.12, 0.12); // E5
      tone(ctx, 784, 0.24, 0.18); // G5
      break;

    case 'wrong':
      tone(ctx, 300, 0,    0.10, 'sawtooth', 0.2);
      tone(ctx, 240, 0.10, 0.18, 'sawtooth', 0.15);
      break;

    case 'complete':
      tone(ctx, 523,  0,    0.10); // C5
      tone(ctx, 659,  0.10, 0.10); // E5
      tone(ctx, 784,  0.20, 0.10); // G5
      tone(ctx, 1047, 0.30, 0.35); // C6
      tone(ctx, 784,  0.35, 0.10); // G5 (echo)
      tone(ctx, 1047, 0.45, 0.45); // C6 (long)
      break;
  }
};
