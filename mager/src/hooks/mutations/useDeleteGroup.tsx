import { useMutation } from 'react-query';
import { useToast } from '..';
import { supabase } from '../../utils/supabaseClient';

const useDeleteGroup = (group_id: string) => {
  const { showErrorToast } = useToast();

  const deleteGroup = async () => {
    // delete all invites related to id
    // delete all excrement logs related to id
    // delete all food logs related to id
    // delete all members related to id
    // delete group
    const { data, error } = await supabase
      .from('invites')
      .delete()
      .eq('group_id', group_id)
      .then(
        async () =>
          await supabase
            .from('excrement_logs')
            .delete()
            .eq('group_id', group_id)
            .then(
              async () =>
                await supabase
                  .from('food_logs')
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
            ),
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

  return useMutation('deleteGroup', () => deleteGroup());
};

export default useDeleteGroup;