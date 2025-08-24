import React, { memo, useCallback } from 'react';
import { Clock } from 'lucide-react';
import { TextField, InputAdornment } from '@mui/material';
import { DateUtils } from '@/utils/date.utils';
import { APP_CONFIG } from '@/config/app.config';

interface ScheduleTimeInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const ScheduleTimeInput = memo<ScheduleTimeInputProps>(
  ({ value, onChange, error, disabled = false }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <TextField
        type='datetime-local'
        label={APP_CONFIG.content.labels.scheduleTime}
        value={value}
        onChange={handleChange}
        inputProps={{
          min: DateUtils.getMinDateTime(),
          step: 60, // 1 minute steps
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Clock style={{ fontSize: '1rem' }} />
            </InputAdornment>
          ),
        }}
        error={!!error}
        helperText={error}
        disabled={disabled}
        required
        fullWidth
        variant='outlined'
        size='medium'
      />
    );
  }
);

ScheduleTimeInput.displayName = 'ScheduleTimeInput';

export default ScheduleTimeInput;
