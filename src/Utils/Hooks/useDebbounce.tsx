import * as React from 'react';

const useDebounce: <T>(v: T, d: number) => T = (value, delay) => {
  const [debouncedValue, setDebouncedValue] =
    React.useState<typeof value>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
