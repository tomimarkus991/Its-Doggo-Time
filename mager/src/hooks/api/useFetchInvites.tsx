import { useEffect } from 'react';
import { useUser } from '../../context';
import { InviteDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useFetchInvites = () => {
  const { username, setUserInvites } = useUser();

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const { data: invitesdata, error } = await supabase
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
          .eq('receiver', username);
        const _invitesdata = invitesdata as InviteDataType[];
        setUserInvites(_invitesdata);
        // _invitesdata.forEach(invite => {
        // listenForInviteDeletes(invite);
        // });
        if (error) throw error.message;
      } catch (error) {
        throw error;
      }
    };

    fetchInvites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
};
