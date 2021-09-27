import { useEffect, useState } from 'react';
import { useGroup } from '../../context';
import { GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useFetchGroupData = (group_id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setCreatorId, setGroupname, setGroupAvatarUrl, setMembers } =
    useGroup();
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
              avatar_url,
              creator_id,
              profiles (id, username, avatar_url)
          `,
          )
          .eq('id', group_id)
          .single();
        let _groupData: GroupPageDataType = data;
        const { avatar_url, group_name, creator_id, profiles } =
          _groupData;

        setCreatorId(creator_id);
        setGroupname(group_name);
        setGroupAvatarUrl(avatar_url);
        setMembers(profiles);
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
