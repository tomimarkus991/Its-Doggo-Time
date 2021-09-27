import { useEffect, useState } from 'react';
import { ExcrementLogsdataType } from '../../types';

const useExcrementLogsPlaceholder = (
  logsdata: ExcrementLogsdataType[] | undefined,
) => {
  const [placeholders, setPlaceholders] = useState<string[]>();

  useEffect(() => {
    let getPlaceholders = () => {
      let max = 4;
      if (!logsdata) return;

      // gets how many placeholders to render
      const _placeholders = max - logsdata.length;

      let placeholderArray: string[] = [];

      for (let i = 1; i <= _placeholders; i++) {
        placeholderArray.push('holder');
      }
      setPlaceholders(placeholderArray);
    };
    getPlaceholders();
  }, [logsdata]);

  return {
    placeholders,
  };
};

export default useExcrementLogsPlaceholder;
