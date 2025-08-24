import React, { memo } from 'react';
import { Calendar } from 'lucide-react';
import { UI_CONFIG, APP_CONFIG } from '@/config';

const TimelineHeader = memo(() => {
  return (
    <div className={UI_CONFIG.spacing.section}>
      <h2
        className={`${UI_CONFIG.typography.heading.primary} ${UI_CONFIG.colors.neutral[800]}`}
      >
        <Calendar
          className={`${UI_CONFIG.icons.xlarge} ${UI_CONFIG.colors.success.text}`}
        />
        {APP_CONFIG.content.headings.timeline}
      </h2>
      <p className={UI_CONFIG.colors.neutral[600]}>
        {APP_CONFIG.content.descriptions.timeline}
      </p>
    </div>
  );
});

TimelineHeader.displayName = 'TimelineHeader';

export default TimelineHeader;
