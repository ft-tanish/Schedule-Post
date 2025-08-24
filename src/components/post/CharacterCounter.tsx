import React, { memo } from 'react';
import { clsx } from 'clsx';
import { UI_CONFIG, APP_CONFIG } from '@/config';

interface CharacterCounterProps {
  currentLength: number;
  maxLength: number;
}

const CharacterCounter = memo<CharacterCounterProps>(
  ({ currentLength, maxLength }) => {
    const remaining = maxLength - currentLength;
    const isNearLimit = currentLength > APP_CONFIG.post.warningThreshold;
    const isAtLimit = currentLength >= maxLength;

    return (
      <div
        className={`${UI_CONFIG.spacing.small} ${UI_CONFIG.layout.flex.between} text-sm`}
      >
        <span className={UI_CONFIG.colors.neutral[500]}>
          {APP_CONFIG.content.messages.characterCount(currentLength, maxLength)}
        </span>

        {isNearLimit && (
          <span
            className={clsx(
              'font-medium',
              isAtLimit
                ? UI_CONFIG.colors.error[600]
                : UI_CONFIG.colors.warning[600]
            )}
          >
            {APP_CONFIG.content.messages.charactersRemaining(remaining)}
          </span>
        )}
      </div>
    );
  }
);

CharacterCounter.displayName = 'CharacterCounter';

export default CharacterCounter;
