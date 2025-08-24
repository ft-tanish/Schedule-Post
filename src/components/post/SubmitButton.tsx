import React, { memo } from 'react';
import { Send } from 'lucide-react';
import { Button, CircularProgress } from '@mui/material';
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
        onClick={onClick}
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        startIcon={
          !isSubmitting ? <Send style={{ fontSize: '1rem' }} /> : undefined
        }
      >
        {isSubmitting ? (
          <>
            <CircularProgress size={16} style={{ marginRight: 8 }} />
            {APP_CONFIG.content.labels.submitting}
          </>
        ) : (
          APP_CONFIG.content.labels.submitButton
        )}
      </Button>
    );
  }
);

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
