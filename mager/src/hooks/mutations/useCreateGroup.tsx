import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router";

import { useToast } from "..";
import { GroupType } from "types";
import { supabase } from "utils";
import { useUser } from "../queries";

type CreateGroupType = {
  groupname: string;
  group_avatar_url: string;
};

const useCreateGroup = () => {
  const { showErrorToast } = useToast();
  const { data: user } = useUser();
  const router = useHistory();
  const queryClient = useQueryClient();

  const createGroup = async ({ groupname, group_avatar_url }: CreateGroupType) => {
    const updates = {
      group_name: groupname,
      avatar_url: group_avatar_url,
      creator_id: user?.id,
      updated_at: new Date(),
    };

    const { data, error: groupsError } = await supabase.from("groups").insert(updates).single();

    if (groupsError) {
      showErrorToast({
        title: "Create Group Error",
        description: groupsError.message,
      });

      throw new Error(groupsError.message);
    }

    const memberUpdates = {
      profile_id: user?.id,
      group_id: data.id,
    };

    const { error: membersError } = await supabase.from("members").insert(memberUpdates, {
      returning: "minimal",
    });

    if (membersError) {
      showErrorToast({
        title: "Create Group Error",
        description: membersError.message,
      });

      throw new Error(membersError.message);
    }
    return data;
  };

  return useMutation(
    "createGroup",
    ({ groupname, group_avatar_url }: CreateGroupType) =>
      createGroup({ groupname, group_avatar_url }),
    {
      onSuccess: async (newGroup: GroupType) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries("user");

        // Optimistically update to the new value
        queryClient.setQueryData("user", (oldData: any) => {
          return [...oldData.groups, newGroup];
        });

        // Push user to home page
        router.push("/");
      },
      // Refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};
export default useCreateGroup;
