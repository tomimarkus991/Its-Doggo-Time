import { useMutation } from 'react-query';
import { useToast } from '..';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const useLeaveGroup = (user_id: StringOrUndefined, group_id: string) => {
  const { showErrorToast } = useToast();

  const leaveGroup = async () => {
    const { data, error } = await supabase
      .from('members')
      .delete()
      .eq('profile_id', user_id)
      .eq('group_id', group_id)
      .then(
        async () =>
          await supabase.from('groups').delete().eq('id', group_id),
      );

    if (error) {
      showErrorToast({
        title: 'Error',
        description: error.message,
      });
      throw new Error(error.message);
    }

    return data;
  };

  return useMutation('leaveGroup', () => leaveGroup());
};

export default useLeaveGroup;
