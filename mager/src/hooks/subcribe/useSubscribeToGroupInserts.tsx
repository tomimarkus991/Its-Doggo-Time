import { GroupType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToGroupInserts = ({
  userId,
  setGroups,
}: {
  userId: StringOrUndefined;
  setGroups: React.Dispatch<React.SetStateAction<GroupType[]>>;
}) => {
  return {
    subscribeToGroupInserts: () =>
      // when a you are inserted to members
      // (by accepting invite or directly from database)
      supabase
        .from(`members:profile_id=eq.${userId}`)
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
        .subscribe(),
  };
};
