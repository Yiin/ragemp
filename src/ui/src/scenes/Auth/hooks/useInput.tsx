import React, { useState, useCallback, useEffect } from 'react';

type Value<T> = string | number | boolean | T;
type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

function useInput<T>(initialValue: T): [T, (e: ChangeEvent) => void] {
  const [value, setValue] = useState<any>(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent) => {
      switch (e.target.type) {
        case 'checkbox':
          setValue(!value);
          break;
        default:
          if (e.target instanceof HTMLSelectElement) {
            setValue(e.target.selectedIndex);
          } else {
            setValue(e.target.value);
          }
      }
    },
    []
  );

  // sync with initial value
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, onChange];
}

export default useInput;
