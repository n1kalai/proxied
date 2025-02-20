'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NumberButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  initialValue?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: number) => void;
}

export function NumberButtonGroup({
  initialValue = 0,
  min = 0,
  max = 100,
  onValueChange,
  className,
  ...props
}: NumberButtonGroupProps) {
  const [value, setValue] = useState(initialValue);

  const handleDecrement = () => {
    const newValue = Math.max(min, value - 1);
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + 1);
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div
      className={cn('inline-flex items-center rounded-md shadow-sm', className)}
      role="group"
      {...props}
    >
      <Button
        onClick={handleDecrement}
        disabled={value <= min}
        className="rounded-r-none"
        aria-label="Decrease by one"
      >
        -1
      </Button>
      <div className="px-4 py-2 text-sm font-medium bg-background border-y border-x border-input">
        {value}
      </div>
      <Button
        onClick={handleIncrement}
        disabled={value >= max}
        className="rounded-l-none"
        aria-label="Increase by one"
      >
        +1
      </Button>
    </div>
  );
}
