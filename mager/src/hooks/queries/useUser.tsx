import { useQuery } from 'react-query';
import { useToast } from '..';
import { UserType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const useUser = () => {
  const user = supabase.auth.user();
  const { showErrorToast } = useToast();

  const getUser = async () => {
    const { data: _data, error } = await supabase
      .from('profiles')
      .select(
        `
          id,
          username,
          avatar_url,
          groups (id, group_name, avatar_url, creator_id)
        `,
      )
      .eq('id', user?.id)
      .single();

    const data = _data as UserType;

    if (error) {
      showErrorToast({
        title: 'Error',
        description: error.message,
      });
      throw new Error(error.message);
    }

    if (!data) {
      showErrorToast({
        title: 'Error',
        description: 'User not found',
      });
      throw new Error('User not found');
    }

    return data;
  };

  return useQuery('user', () => getUser());
};

export default useUser;
