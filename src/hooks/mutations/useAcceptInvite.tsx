import { useMutation, useQueryClient } from "react-query";

import { supabase } from "utils";

import { useToast } from "..";
import { useUser } from "../queries";

type AcceptInviteType = {
  group_id: string;
  invite_id: string;
};

export const useAcceptInvite = () => {
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const acceptInvite = async (group_id: string, invite_id: string) => {
    const memberUpdates = {
      profile_id: user?.id,
      group_id,
    };
    // add me to the members list of that group
    const { error: insertMemberError } = await supabase.from("members").insert(memberUpdates);

    // throw error if error
    if (insertMemberError) {
      showErrorToast({
        title: "Insert Invite Member Error",
        description: insertMemberError.message,
      });

      throw new Error(insertMemberError.message);
    }

    // delete the invite with that id
    const { error: deleteInviteError } = await supabase
      .from("invites")
      .delete()
      .eq("id", invite_id);

    if (deleteInviteError) {
      showErrorToast({
        title: "Delete Invite Error",
        description: deleteInviteError.message,
      });

      throw new Error(deleteInviteError.message);
    }
  };

  return useMutation(
    "acceptInvite",
    ({ group_id, invite_id }: AcceptInviteType) => acceptInvite(group_id, invite_id),
    {
      // Refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries("invites");
        queryClient.invalidateQueries("user");
      },
    }
  );
};
