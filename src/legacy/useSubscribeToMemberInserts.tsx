import { useEffect } from "react";

import { supabase } from "utils";

import { useGroup } from "legacy/GroupContext";
import { MemberType } from "types";

export const useSubscribeToMemberInserts = (group_id: string) => {
  const { setMembers } = useGroup();
  useEffect(() => {
    const subscribeToMemberInserts = () =>
      // when you are inserted to members
      // (by accepting invite or directly from database)
      supabase
        // only show it to members with this group_id
        .from(`members:group_id=eq.${group_id}`)
        .on("INSERT", async payload => {
          const { data } = await supabase
            .from("profiles")
            .select(
              `
          id,
          username,
          avatar_url
      `
            )
            .eq("id", payload.new.profile_id)
            .single();

          const { id, username, avatar_url } = data as MemberType;

          const newProfile: MemberType = {
            id,
            username,
            avatar_url,
          };
          // update frontend with new data
          setMembers((oldData: any) => [...oldData, newProfile]);
        })
        .subscribe();

    subscribeToMemberInserts();

    return () => {
      supabase.removeSubscription(subscribeToMemberInserts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
