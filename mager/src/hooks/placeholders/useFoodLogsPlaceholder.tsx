import { useEffect, useState } from "react";

import { FoodLogsdataType } from "types";

export const useFoodLogsPlaceholder = (logsdata: FoodLogsdataType[] | undefined) => {
  const [placeholders, setPlaceholders] = useState<string[]>();

  useEffect(() => {
    const getPlaceholders = () => {
      const max = 4;
      if (!logsdata) return;

      // gets how many placeholders to render
      const _placeholders = max - logsdata.length;

      const placeholderArray: string[] = [];

      for (let i = 1; i <= _placeholders; i++) {
        placeholderArray.push("holder");
      }
      setPlaceholders(placeholderArray);
    };
    getPlaceholders();
  }, [logsdata]);

  return {
    placeholders,
  };
};
