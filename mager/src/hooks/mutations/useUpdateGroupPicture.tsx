import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '..';
import { supabase } from '../../utils/supabaseClient';

const useUpdateGroupPicture = (id: string) => {
  const { showErrorToast, showSuccessToast } = useToast();
  const queryClient = useQueryClient();

  const updateGroupPicture = async (avatar_url: string) => {
    const updates = {
      id,
      avatar_url,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('groups').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    });

    if (error) {
      showErrorToast({
        title: 'Error',
        description: error.message,
      });
      throw error;
    }
  };

  return useMutation(
    'updateGroupPicture',
    (url: any) => updateGroupPicture(url),
    {
      onSuccess: () => {
        queryClient.refetchQueries('group' + id);
        showSuccessToast({
          title: 'Group Picture Updated',
          description: 'Your Group Picture has been updated.',
        });
      },
    },
  );
};
export default useUpdateGroupPicture;
