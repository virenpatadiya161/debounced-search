import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // Restart the timer when typing continues; also clean up on unmount.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
