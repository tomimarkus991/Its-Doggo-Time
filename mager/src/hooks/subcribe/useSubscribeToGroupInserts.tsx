import { useEffect } from 'react';
import { useAuth, useGroup } from '../../context';
import { GroupType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToGroupInserts = () => {
  const { setGroups } = useGroup();
  const { user } = useAuth();

  useEffect(() => {
    const subscribeToGroupInserts = () =>
      supabase
        .from(`members:profile_id=eq.${user?.id}`)
        .on('INSERT', async payload => {
          // you get the group_id from payload
          // and get group_name and avatar_url
          let { data: group } = await supabase
            .from('groups')
            .select(
              `
      id,
      group_name,
      avatar_url
  `,
            )
            .eq('id', payload.new.group_id)
            .single();
          const { id, group_name, avatar_url } = group as GroupType;

          const newGroup: GroupType = {
            id,
            group_name,
            avatar_url,
          };
          // update frontend with new data
          setGroups(oldData => [...oldData, newGroup]);
        })
        .subscribe();

    subscribeToGroupInserts();

    return () => {
      supabase.removeSubscription(subscribeToGroupInserts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
