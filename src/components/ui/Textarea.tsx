import React, { memo, forwardRef } from 'react';
import { clsx } from 'clsx';
import { UI_CONFIG } from '@/config/ui.config';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
      {
        label,
        error,
        helperText,
        showCharCount = false,
        maxLength,
        className,
        id,
        value,
        ...props
      },
      ref
    ) => {
      const inputId =
        id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
      const currentLength = typeof value === 'string' ? value.length : 0;

      return (
        <div className='w-full flex-1 flex flex-col'>
          {label && (
            <label htmlFor={inputId} className={UI_CONFIG.form.label}>
              {label}
            </label>
          )}

          <textarea
            ref={ref}
            id={inputId}
            className={clsx(
              UI_CONFIG.form.textarea,
              error && 'border-red-300 focus:ring-red-500',
              'flex-1',
              className
            )}
            value={value}
            maxLength={maxLength}
            {...props}
          />

          <div className='mt-2 flex justify-between items-center text-sm'>
            {showCharCount && maxLength && (
              <span className={UI_CONFIG.colors.neutral[500]}>
                {currentLength}/{maxLength} characters
              </span>
            )}

            {showCharCount && maxLength && currentLength > maxLength * 0.9 && (
              <span
                className={clsx(
                  'font-medium',
                  currentLength >= maxLength
                    ? UI_CONFIG.colors.error[600]
                    : UI_CONFIG.colors.warning[600]
                )}
              >
                {maxLength - currentLength} remaining
              </span>
            )}
          </div>

          {error && (
            <p className='mt-1 text-sm text-red-600' role='alert'>
              {error}
            </p>
          )}

          {helperText && !error && (
            <p className='mt-1 text-sm text-slate-500'>{helperText}</p>
          )}
        </div>
      );
    }
  )
);

Textarea.displayName = 'Textarea';

export default Textarea;
