import { useQuery } from 'react-query';
import { useUser } from '.';
import { useToast } from '..';
import { InviteDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useFetchInvites = () => {
  const { showErrorToast } = useToast();
  const { data: userData } = useUser();

  const fetchInvites = async () => {
    const { data, error } = await supabase
      .from('invites')
      .select(
        `
              id,
              receiver,
              sender,
              group_id,
              groups (id, group_name, avatar_url)
            `,
      )
      .eq('receiver', userData?.username);
    const _invitesdata = data as InviteDataType[];

    if (error) {
      showErrorToast({
        title: 'Error',
        description: error.message,
      });
      throw new Error(error.message);
    }

    return _invitesdata;
  };

  return useQuery<InviteDataType[], Error>('invites', () =>
    fetchInvites(),
  );
};

export default useFetchInvites;
