import { InviteDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToInviteInserts = ({
  username,
  setUserInvites,
}: {
  username: StringOrUndefined;
  setUserInvites: React.Dispatch<React.SetStateAction<InviteDataType[]>>;
}) => {
  return {
    subscribeToInviteInserts: () =>
      supabase
        // only listen to updates that have your username in it
        .from(`invites:receiver=eq.${username}`)
        // when someone invites you to group
        .on('INSERT', async payload => {
          // take the newly inserted data
          const { sender, receiver, id, group_id } = payload.new;
          let { data: groups } = await supabase
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

          const newInvite: InviteDataType = {
            id,
            group_id,
            sender,
            receiver,
            groups,
          };
          setUserInvites(oldData => [...oldData, newInvite]);
        })
        .subscribe(),
  };
};
