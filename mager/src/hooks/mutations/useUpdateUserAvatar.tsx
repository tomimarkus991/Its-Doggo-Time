import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '..';
import { useAuth } from '../../context';
import { supabase } from '../../utils/supabaseClient';

const useUpdateUserAvatar = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const updateUserAvatar = async (avatar_url: string) => {
    const updates = {
      id: user?.id,
      avatar_url,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal',
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
    'updateUserAvatar',
    (url: any) => updateUserAvatar(url),
    {
      onSuccess: () => {
        queryClient.refetchQueries('user');
        showSuccessToast({
          title: 'Avatar Updated',
          description: 'Your Avatar has been updated.',
        });
      },
    },
  );
};
export default useUpdateUserAvatar;
