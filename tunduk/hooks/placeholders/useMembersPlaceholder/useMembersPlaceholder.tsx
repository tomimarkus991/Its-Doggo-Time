import { useEffect, useState } from 'react';
import { ProfileType } from '../../../types';

const useMembersPlaceholder = (members: ProfileType[] | undefined) => {
  const [placeholders, setPlaceholders] = useState<string[]>();

  useEffect(() => {
    let getPlaceholders = () => {
      let max = 6;
      if (!members) return;
      const _placeholders = max - members.length;

      let placeholderArray: string[] = [];

      for (let i = 1; i <= _placeholders; i++) {
        placeholderArray.push('placeholder');
      }
      setPlaceholders(placeholderArray);
    };
    getPlaceholders();
  }, [members]);

  return {
    placeholders,
  };
};

export default useMembersPlaceholder;
