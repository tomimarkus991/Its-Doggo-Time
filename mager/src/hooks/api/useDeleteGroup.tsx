import { useHistory } from 'react-router';
import { supabase } from '../../utils/supabaseClient';

export const useDeleteGroup = (group_id: string) => {
  const router = useHistory();
  const deleteGroup = async () => {
    // delete all invites related to id
    // delete all logs related to id
    // delete all members related to id
    // delete group
    try {
      await supabase
        .from('invites')
        .delete()
        .eq('group_id', group_id)
        .then(
          async () =>
            await supabase
              .from('logs')
              .delete()
              .eq('group_id', group_id)
              .then(
                async () =>
                  await supabase
                    .from('members')
                    .delete()
                    .eq('group_id', group_id)
                    .then(
                      async () =>
                        await supabase
                          .from('groups')
                          .delete()
                          .eq('id', group_id),
                    ),
              ),
        );
    } catch (error) {
      throw error;
    } finally {
      router.push('/');
    }
  };
  return deleteGroup;
};