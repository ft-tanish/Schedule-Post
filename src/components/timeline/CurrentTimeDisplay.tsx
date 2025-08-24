import React, { memo } from 'react';
import { DateUtils } from '@/utils/date.utils';
import { UI_CONFIG, APP_CONFIG } from '@/config';

interface CurrentTimeDisplayProps {
  currentTime: Date;
}

const CurrentTimeDisplay = memo<CurrentTimeDisplayProps>(({ currentTime }) => {
  return (
    <div
      className={`${UI_CONFIG.spacing.element} pt-4 ${UI_CONFIG.colors.neutral[200]}`}
    >
      <div className={`text-center text-sm ${UI_CONFIG.colors.neutral[500]}`}>
        {APP_CONFIG.content.messages.currentTime}{' '}
        {DateUtils.formatDisplayWithSeconds(currentTime)}
      </div>
    </div>
  );
});

CurrentTimeDisplay.displayName = 'CurrentTimeDisplay';

export default CurrentTimeDisplay;
