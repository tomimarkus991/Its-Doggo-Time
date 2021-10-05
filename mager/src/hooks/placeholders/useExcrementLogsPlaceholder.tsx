import { useEffect, useState } from 'react';

const useExcrementLogsPlaceholder = (logsdata: any) => {
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
