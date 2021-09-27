import { useEffect } from 'react';
import { useUser } from '../../context';
import { InviteDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToInviteInserts = () => {
  const { username, setUserInvites } = useUser();
  useEffect(() => {
    console.log('username', username);

    const subscribeToInviteInserts = () =>
      supabase
        // only listen to updates that have your username in it
        .from('invites:receiver=eq.' + username)
        // when someone invites you to group
        .on('INSERT', async payload => {
          // take the newly inserted data
          const { sender, receiver, id, group_id } = payload.new;
          console.log('payload', payload.new);

          let { data } = await supabase
            .from('groups')
            .select(
              `
              id,
              group_name,
              avatar_url
            `,
            )
            .eq('id', group_id)
            .single();
          console.log(data);

          const newInvite: InviteDataType = {
            id,
            group_id,
            sender,
            receiver,
            groups: data,
          };
          setUserInvites(oldData => [...oldData, newInvite]);
        })
        .subscribe();

    subscribeToInviteInserts();

    return () => {
      supabase.removeSubscription(subscribeToInviteInserts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
};
