import React, { memo, forwardRef } from 'react';
import { clsx } from 'clsx';
import { UI_CONFIG } from '@/config/ui.config';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, helperText, className, id, ...props }, ref) => {
      const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

      return (
        <div className='w-full'>
          {label && (
            <label
              htmlFor={inputId}
              className={clsx(
                UI_CONFIG.form.label,
                icon && 'flex items-center gap-2'
              )}
            >
              {icon && <span className='flex-shrink-0'>{icon}</span>}
              {label}
            </label>
          )}

          <input
            ref={ref}
            id={inputId}
            className={clsx(
              UI_CONFIG.form.input,
              error && 'border-red-300 focus:ring-red-500',
              className
            )}
            {...props}
          />

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

Input.displayName = 'Input';

export default Input;
