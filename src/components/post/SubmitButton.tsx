import React, { memo } from 'react';
import { Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import { APP_CONFIG } from '@/config/app.config';

interface SubmitButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const SubmitButton = memo<SubmitButtonProps>(
  ({ isValid, isSubmitting, disabled = false, onClick }) => {
    return (
      <Button
        type='submit'
        disabled={!isValid || isSubmitting || disabled}
        loading={isSubmitting}
        icon={!isSubmitting && <Send className='w-4 h-4' />}
        onClick={onClick}
      >
        {isSubmitting
          ? APP_CONFIG.content.labels.submitting
          : APP_CONFIG.content.labels.submitButton}
      </Button>
    );
  }
);

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
