import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '..';
import { supabase } from '../../utils';

const useSignOut = () => {
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      showErrorToast({
        title: 'Sign Out Error',
        description: error.message,
      });
      throw new Error(error.message);
    }
  };

  return useMutation('signOut', () => signOut(), {
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
};
export default useSignOut;
