import { useState } from 'react';
import { useInterval } from './useInterval';
import { APP_CONFIG } from '@/config/app.config';

/**
 * Custom hook for getting current time with automatic updates
 */
export function useCurrentTime(): Date {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useInterval(() => {
    setCurrentTime(new Date());
  }, APP_CONFIG.timing.updateInterval);

  return currentTime;
}
