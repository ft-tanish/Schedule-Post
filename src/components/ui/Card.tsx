import React, { memo } from 'react';
import { clsx } from 'clsx';
import { UI_CONFIG } from '@/config/ui.config';

interface CardProps {
  variant?: 'default' | 'scheduled' | 'scheduledOverdue' | 'published';
  className?: string;
  children: React.ReactNode;
}

const Card = memo<CardProps>(({ variant = 'default', className, children }) => {
  const variantClasses = {
    default: UI_CONFIG.card.white,
    scheduled: UI_CONFIG.card.scheduled,
    scheduledOverdue: UI_CONFIG.card.scheduledOverdue,
    published: UI_CONFIG.card.published,
  };

  return (
    <div
      className={clsx(UI_CONFIG.card.base, variantClasses[variant], className)}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
