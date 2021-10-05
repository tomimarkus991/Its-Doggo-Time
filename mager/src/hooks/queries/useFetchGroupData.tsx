import { useQuery } from 'react-query';
import { useToast } from '..';
import { GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const useFetchGroupData = (group_id: string) => {
  const { showErrorToast } = useToast();

  const fetchGroupData = async () => {
    let { data, error } = await supabase
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

    if (error) {
      showErrorToast({
        title: 'Error',
        description: error.message,
      });
      throw new Error(error.message);
    }

    let _groupData: GroupPageDataType = data;

    return _groupData;
  };

  return useQuery('group' + group_id, () => fetchGroupData());
};

export default useFetchGroupData;
