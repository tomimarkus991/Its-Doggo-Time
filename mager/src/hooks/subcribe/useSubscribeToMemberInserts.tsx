import { useGroup } from '../../context';
import { MemberType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToMemberInserts = ({
  group_id,
}: {
  group_id: string;
}) => {
  const { setMembers } = useGroup();
  return {
    subscribetoMemberInserts: () =>
      // when you are inserted to members
      // (by accepting invite or directly from database)
      supabase
        // only show it to members with this group_id
        .from(`members:group_id=eq.${group_id}`)
        .on('INSERT', async payload => {
          let { data: profile } = await supabase
            .from('profiles')
            .select(
              `
          id,
          username,
          avatar_url
      `,
            )
            .eq('id', payload.new.profile_id)
            .single();

          const { id, username, avatar_url } = profile as MemberType;

          const newProfile: MemberType = {
            id,
            username,
            avatar_url,
          };
          // update frontend with new data
          setMembers((oldData: any) => [...oldData, newProfile]);
        })
        .subscribe(),
  };
};
