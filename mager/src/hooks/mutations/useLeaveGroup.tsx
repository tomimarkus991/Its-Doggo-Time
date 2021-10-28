import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '..';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils';

const useLeaveGroup = (user_id: StringOrUndefined, group_id: string) => {
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  const leaveGroup = async () => {
    const { data, error } = await supabase
      .from('members')
      .delete()
      .eq('profile_id', user_id)
      .eq('group_id', group_id);

    if (error) {
      showErrorToast({
        title: 'Leave Group Error',
        description: error.message,
      });
      throw new Error(error.message);
    }

    return data;
  };

  return useMutation('leaveGroup', () => leaveGroup(), {
    // Refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('user');
    },
  });
};

export default useLeaveGroup;
