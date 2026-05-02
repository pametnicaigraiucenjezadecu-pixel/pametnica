import { useCallback } from 'react';
import { speak, playSound } from '../services/audio';

export const useAudio = () => {
  const pronounce = useCallback((text: string) => {
    speak(text);
  }, []);

  const sound = useCallback((type: Parameters<typeof playSound>[0]) => {
    playSound(type);
  }, []);

  return { pronounce, sound };
};
