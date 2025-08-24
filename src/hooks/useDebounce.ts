import { useState, useEffect } from 'react';
import { APP_CONFIG } from '@/config/app.config';

/**
 * Custom hook for debouncing values
 */
export function useDebounce<T>(
  value: T,
  delay: number = APP_CONFIG.performance.debounceMs
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
