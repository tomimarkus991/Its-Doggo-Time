import { useMutation } from 'react-query';
import { useToast } from '..';
import { supabase } from '../../utils/supabaseClient';
import { useUser } from '../queries';

const useCreateGroup = () => {
  const { showErrorToast } = useToast();
  const { data: user } = useUser();

  const createGroup = async (
    groupname: string,
    group_avatar_url: string,
  ) => {
    const updates = {
      group_name: groupname,
      avatar_url: group_avatar_url,
      creator_id: user?.id,
      updated_at: new Date(),
    };

    let { data, error: groupsError } = await supabase
      .from('groups')
      .insert(updates, {
        returning: 'representation',
      })
      .single();

    if (groupsError) {
      showErrorToast({
        title: 'Error',
        description: groupsError.message,
      });

      throw groupsError;
    }

    const memberUpdates = {
      profile_id: user?.id,
      group_id: data.id,
    };

    let { error: membersError } = await supabase
      .from('members')
      .insert(memberUpdates, {
        returning: 'minimal',
      });

    if (membersError) {
      showErrorToast({
        title: 'Error',
        description: membersError.message,
      });

      throw membersError;
    }
  };

  return useMutation(
    'createGroup',
    ({
      groupname,
      group_avatar_url,
    }: {
      groupname: string;
      group_avatar_url: string;
    }) => createGroup(groupname, group_avatar_url),
  );
};
export default useCreateGroup;
