import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (autoStart = false) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const start  = useCallback(() => setRunning(true),  []);
  const pause  = useCallback(() => setRunning(false), []);
  const reset  = useCallback(() => { setSeconds(0); setRunning(false); }, []);

  const formatTime = (s: number): string => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return { seconds, running, start, pause, reset, formatTime };
};
