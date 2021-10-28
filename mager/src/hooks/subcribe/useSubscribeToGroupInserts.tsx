import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useAuth } from '../../context';
import { GroupType } from '../../types';
import { supabase } from '../../utils';

export const useSubscribeToGroupInserts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscribeToGroupInserts = () =>
      supabase
        .from(`members:profile_id=eq.${user?.id}`)
        // you get the group_id from payload
        .on('INSERT', async payload => {
          // get group_name and avatar_url
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
          // await queryClient.cancelQueries('groups');

          // const previousUserState = queryClient.getQueryData('user');
          // update frontend with new data
          queryClient.setQueryData('userGroups', (oldData: any) => {
            return [...oldData, newGroup];
          });

          // return { previousUserState };
        })
        .subscribe();

    subscribeToGroupInserts();

    return () => {
      console.log('remove');

      supabase.removeSubscription(subscribeToGroupInserts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
