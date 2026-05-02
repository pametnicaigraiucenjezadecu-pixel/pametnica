import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { toCyrillic } from '../utils/transliterate';

/** Returns an `s(text)` function that converts to Cyrillic when script='cyrillic'. */
export const useScript = () => {
  const { state } = useApp();
  return useCallback(
    (text: string) => state.script === 'cyrillic' ? toCyrillic(text) : text,
    [state.script]
  );
};
