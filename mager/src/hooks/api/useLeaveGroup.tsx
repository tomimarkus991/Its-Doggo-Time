import { useHistory } from 'react-router';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useLeaveGroup = (
  user_id: StringOrUndefined,
  group_id: string,
) => {
  const router = useHistory();

  const leaveGroup = async () => {
    try {
      await supabase
        .from('members')
        .delete()
        .eq('profile_id', user_id)
        .eq('group_id', group_id)
        .then(
          async () =>
            await supabase.from('groups').delete().eq('id', group_id),
        );
    } catch (error) {
      throw error;
    } finally {
      router.push('/');
    }
  };

  return leaveGroup;
};
