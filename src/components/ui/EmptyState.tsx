import React, { memo } from 'react';
import { UI_CONFIG } from '@/config/ui.config';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const EmptyState = memo<EmptyStateProps>(
  ({ icon, title, description, action }) => {
    return (
      <div className={UI_CONFIG.layout.flex.center}>
        <div className='text-center py-12'>
          <div className={`${UI_CONFIG.colors.neutral[300]} mx-auto mb-4`}>
            {icon}
          </div>
          <h3
            className={`${UI_CONFIG.typography.heading.tertiary} ${UI_CONFIG.colors.neutral[500]}`}
          >
            {title}
          </h3>
          <p className={UI_CONFIG.colors.neutral[400]}>{description}</p>
          {action && <div className='mt-6'>{action}</div>}
        </div>
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export default EmptyState;
