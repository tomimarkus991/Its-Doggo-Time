import { useMutation } from "react-query";

import { supabase } from "utils";

import { useToast } from "..";

export const useRemoveGroupMember = () => {
  const { showErrorToast, showSuccessToast } = useToast();

  const removeGroupMember = async (user_id: string, group_id: string) => {
    const { error } = await supabase
      .from("members")
      .delete()
      .eq("profile_id", user_id)
      .eq("group_id", group_id);

    if (error) {
      showErrorToast({
        title: "Remove Group Member Error",
        description: error.message,
      });
      throw new Error(error.message);
    }
  };

  return useMutation(
    "removeGroupMember",
    ({ user_id, group_id }: { user_id: string; group_id: string }) =>
      removeGroupMember(user_id, group_id),
    {
      onSuccess: () => {
        showSuccessToast({
          title: "Success",
          description: "User Removed",
          position: "top",
        });
      },
    }
  );
};
