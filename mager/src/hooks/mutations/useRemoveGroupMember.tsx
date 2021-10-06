import { useMutation } from 'react-query';
import { useToast } from '..';
import { supabase } from '../../utils/supabaseClient';

const useRemoveGroupMember = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const removeGroupMember = async (user_id: string, group_id: string) => {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('profile_id', user_id)
      .eq('group_id', group_id);

    if (error) {
      showErrorToast({ title: 'Error', description: error.message });
      throw error;
    }
  };

  return useMutation(
    'removeGroupMember',
    ({ user_id, group_id }: { user_id: string; group_id: string }) =>
      removeGroupMember(user_id, group_id),
    {
      onSuccess: () => {
        showSuccessToast({
          title: 'Success',
          description: 'User Removed',
          position: 'top',
        });
      },
    },
  );
};
export default useRemoveGroupMember;
