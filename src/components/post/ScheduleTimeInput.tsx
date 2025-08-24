import React, { memo, useCallback } from 'react';
import { Clock } from 'lucide-react';
import Input from '@/components/ui/Input';
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
      <Input
        type='datetime-local'
        label={APP_CONFIG.content.labels.scheduleTime}
        icon={<Clock className='w-4 h-4' />}
        value={value}
        onChange={handleChange}
        min={DateUtils.getMinDateTime()}
        error={error}
        disabled={disabled}
        required
      />
    );
  }
);

ScheduleTimeInput.displayName = 'ScheduleTimeInput';

export default ScheduleTimeInput;
