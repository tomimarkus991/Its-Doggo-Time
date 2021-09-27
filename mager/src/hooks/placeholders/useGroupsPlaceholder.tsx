import { useEffect, useState } from 'react';
import { GroupType } from '../../types';

const useGroupsPlaceholder = (userGroups: GroupType[] | undefined) => {
  const [placeholders, setPlaceholders] = useState<string[]>();
  const [isAddDoggoGroupDisabled, setIsAddDoggoGroupDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    const getPaws = () => {
      const max = 4;
      if (!userGroups) return;
      const _placeholders = max - userGroups.length;
      const placeholderArray: string[] = [];

      for (let i = 1; i <= _placeholders; i++) {
        placeholderArray.push('placeholder');
      }
      setPlaceholders(placeholderArray);
    };
    const howManyGroupsUserHas = () => {
      if (userGroups?.length === 4) {
        setIsAddDoggoGroupDisabled(true);
      }
    };
    howManyGroupsUserHas();
    getPaws();
  }, [userGroups]);

  return {
    placeholders,
    isAddDoggoGroupDisabled,
  };
};

export default useGroupsPlaceholder;
