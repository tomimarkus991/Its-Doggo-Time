import { useEffect, useState } from "react";

import { MemberType } from "types";

export const useMembersPlaceholder = (members: MemberType[] | undefined) => {
  const [placeholders, setPlaceholders] = useState<string[]>();

  useEffect(() => {
    const getPlaceholders = () => {
      const max = 6;
      if (!members) return;
      const _placeholders = max - members.length || 5;

      const placeholderArray: string[] = [];

      for (let i = 1; i <= _placeholders; i++) {
        placeholderArray.push("placeholder");
      }
      setPlaceholders(placeholderArray);
    };
    getPlaceholders();
  }, [members]);

  return {
    placeholders,
  };
};
