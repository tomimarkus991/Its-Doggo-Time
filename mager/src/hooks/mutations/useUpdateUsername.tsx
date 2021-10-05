import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '..';
import { useAuth } from '../../context';
import { supabase } from '../../utils/supabaseClient';
import { useUser } from '../queries';

const useUpdateUsername = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useUser();
  const { user } = useAuth();

  const updateUsername = async (username: string | undefined) => {
    const profile_updates = {
      id: user?.id,
      username,
      updated_at: new Date(),
    };

    if (username && username !== data?.username) {
      // update username
      const { data: profileUpdateData, error } = await supabase
        .from('profiles')
        .upsert(profile_updates, {
          returning: 'minimal',
        });

      if (error?.message.includes('duplicate key')) {
        showErrorToast({
          title: 'Error',
          description: 'User with username exists',
        });
        throw new Error('User with username exists');
      }

      if (error) {
        showErrorToast({
          title: 'Error',
          description: error.message,
        });
        throw error;
      }

      // delete all invites for that user
      await supabase
        .from('invites')
        .delete()
        .eq('sender', data?.username)
        .eq('receiver', data?.username);

      return profileUpdateData;
    } else {
      return undefined;
    }
  };

  return useMutation(
    'updateUsername',
    (username: string | undefined) => updateUsername(username),
    {
      onSuccess: data => {
        queryClient.refetchQueries('user');
        if (data) {
          showSuccessToast({
            title: 'Profile Updated',
            description: 'Your Profile has been updated.',
          });
        }
      },
    },
  );
};
export default useUpdateUsername;
