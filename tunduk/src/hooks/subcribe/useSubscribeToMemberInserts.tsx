import { ProfileType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToMemberInserts = ({
  group_id,
  setProfiles,
}: {
  group_id: string;
  setProfiles: React.Dispatch<React.SetStateAction<ProfileType[]>>;
}) => {
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

          const { id, username, avatar_url } = profile as ProfileType;

          const newProfile: ProfileType = {
            id,
            username,
            avatar_url,
          };
          // update frontend with new data
          setProfiles((oldData: any) => [...oldData, newProfile]);
        })
        .subscribe(),
  };
};
