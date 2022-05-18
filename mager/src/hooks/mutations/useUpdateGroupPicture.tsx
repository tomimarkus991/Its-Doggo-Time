import { useMutation, useQueryClient } from "react-query";

import { supabase } from "utils";

import { useToast } from "..";

const useUpdateGroupPicture = (id: string) => {
  const { showErrorToast, showSuccessToast } = useToast();
  const queryClient = useQueryClient();

  const updateGroupPicture = async (avatar_url: string) => {
    const updates = {
      id,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("groups").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      showErrorToast({
        title: "Update Group Picture Error",
        description: error.message,
      });
      throw new Error(error.message);
    }
  };

  return useMutation("updateGroupPicture", (url: any) => updateGroupPicture(url), {
    onSuccess: () => {
      showSuccessToast({
        title: "Group Picture Updated",
        description: "Your Group Picture has been updated.",
      });
    },
    // Refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("group" + id);
    },
  });
};
export default useUpdateGroupPicture;
