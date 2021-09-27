import { useEffect, useState } from 'react';
import { useGroup } from '../../context';
import { GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useFetchGroupProfile = (group_id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setGroupname, setGroupAvatarUrl } = useGroup();
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setIsLoading(true);
        let { data } = await supabase
          .from('groups')
          .select(
            `
              id,
              group_name,
              avatar_url
          `,
          )
          .eq('id', group_id)
          .single();
        let _groupData: GroupPageDataType = data;
        const { avatar_url, group_name } = _groupData;

        setGroupname(group_name);
        setGroupAvatarUrl(avatar_url);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading };
};
