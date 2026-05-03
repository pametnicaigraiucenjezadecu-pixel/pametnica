import { isSoundEnabled } from './speech';

// ─── Sound Types ──────────────────────────────────────────────────────────────
type SoundType = 'correct' | 'wrong' | 'complete' | 'flip' | 'click' | 'level_complete';

// ─── Global state (one context, one master gain, tracked oscillators) ─────────
let _ctx: AudioContext | null = null;
let _master: GainNode | null = null;
let _activeOscs: OscillatorNode[] = [];

// ─── Debounce / overlap prevention ───────────────────────────────────────────
// Global: minimum gap between ANY two sounds — prevents stacking on rapid taps
const GLOBAL_GAP_MS = 300;
let _lastAnyPlay = 0;

// Per-type: prevents the same short sound from firing twice in quick succession
const TYPE_GAP_MS: Partial<Record<SoundType, number>> = { click: 300, flip: 300 };
const _lastPlay: Partial<Record<SoundType, number>> = {};

// Master volume (0–1). All tones route through this node. Capped well below 0.4.
const MASTER_VOL = 0.35;

// ─── Initialise / resume audio context ────────────────────────────────────────
function getCtx(): AudioContext | null {
  try {
    if (_ctx && _ctx.state !== 'closed') {
      if (_ctx.state === 'suspended') void _ctx.resume();
      return _ctx;
    }
    const Ctor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    _ctx    = new Ctor();
    _master = _ctx.createGain();
    _master.gain.value = MASTER_VOL;
    _master.connect(_ctx.destination);
    return _ctx;
  } catch {
    return null;
  }
}

// ─── Stop every running oscillator immediately ────────────────────────────────
function stopAll(): void {
  _activeOscs.forEach(osc => { try { osc.stop(0); } catch {} });
  _activeOscs = [];
}

// ─── Single tone helper ───────────────────────────────────────────────────────
// gain here is relative (0–1); actual volume = gain × MASTER_VOL
function tone(
  ctx: AudioContext,
  freq: number,
  start: number,   // seconds from now
  dur: number,     // sustain duration in seconds
  type: OscillatorType = 'triangle',
  gain = 0.65,
): void {
  if (!_master) return;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  const t   = ctx.currentTime;

  osc.type            = type;
  osc.frequency.value = freq;

  // 12 ms linear attack → prevents "click" artefact at note onset
  env.gain.setValueAtTime(0, t + start);
  env.gain.linearRampToValueAtTime(gain, t + start + 0.012);
  env.gain.exponentialRampToValueAtTime(0.001, t + start + dur);

  osc.connect(env);
  env.connect(_master);

  osc.start(t + start);
  osc.stop(t + start + dur + 0.02);

  _activeOscs.push(osc);
  osc.onended = () => { _activeOscs = _activeOscs.filter(o => o !== osc); };
}

// ─── Public API ───────────────────────────────────────────────────────────────
export const playSound = (type: SoundType): void => {
  // Respect the global sound toggle
  if (!isSoundEnabled()) return;

  const now = Date.now();

  // Global gap: block ANY sound if another played within 300 ms
  if (now - _lastAnyPlay < GLOBAL_GAP_MS) return;

  // Per-type gap: same sound type must wait its own window
  const typeGap = TYPE_GAP_MS[type];
  if (typeGap && ((_lastPlay[type] ?? 0) + typeGap) > now) return;

  // Record timestamps
  _lastAnyPlay   = now;
  _lastPlay[type] = now;

  const ctx = getCtx();
  if (!ctx || !_master) return;

  // Kill any previous oscillators before scheduling new ones
  stopAll();

  switch (type) {

    // ── UI feedback ──────────────────────────────────────────────────────────
    case 'click':
      tone(ctx, 660, 0, 0.09, 'sine', 0.55);
      break;

    case 'flip':
      tone(ctx, 440, 0,    0.07, 'triangle', 0.55);
      tone(ctx, 580, 0.06, 0.08, 'triangle', 0.45);
      break;

    // ── Game feedback ────────────────────────────────────────────────────────
    case 'wrong':
      // Gentle descending "uh-oh" — not harsh, not frustrating for kids
      tone(ctx, 370, 0,    0.14, 'triangle', 0.52); // F#4
      tone(ctx, 294, 0.12, 0.24, 'triangle', 0.38); // D4
      break;

    case 'correct':
      // Bright C-E-G-C arpeggio — quick, toy-piano feel (~0.45 s total)
      tone(ctx, 523,  0,    0.09, 'triangle', 0.68); // C5
      tone(ctx, 659,  0.08, 0.09, 'triangle', 0.64); // E5
      tone(ctx, 784,  0.16, 0.09, 'triangle', 0.60); // G5
      tone(ctx, 1047, 0.24, 0.28, 'triangle', 0.72); // C6 — held
      break;

    case 'complete':
    case 'level_complete':
      // C-E-G-C6 → bounce → E6 fanfare (~0.9 s total)
      tone(ctx, 523,  0,    0.09, 'triangle', 0.65); // C5
      tone(ctx, 659,  0.08, 0.09, 'triangle', 0.65); // E5
      tone(ctx, 784,  0.16, 0.09, 'triangle', 0.65); // G5
      tone(ctx, 1047, 0.24, 0.11, 'triangle', 0.68); // C6
      tone(ctx, 784,  0.33, 0.07, 'triangle', 0.55); // G5 bounce
      tone(ctx, 1047, 0.39, 0.10, 'triangle', 0.68); // C6
      tone(ctx, 1319, 0.47, 0.50, 'triangle', 0.75); // E6 — final hold
      // Warm bass pad for richness
      tone(ctx, 261,  0.24, 0.58, 'sine',     0.26); // C4
      break;
  }
};
