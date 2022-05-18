import { useMutation, useQueryClient } from "react-query";

import { useToast } from "..";
import { useAuth } from "context";
import { supabase } from "utils";

const useUpdateUserAvatar = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const updateUserAvatar = async (avatar_url: string) => {
    const updates = {
      id: user?.id,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });

    if (error) {
      showErrorToast({
        title: "Update User Avatar Error",
        description: error.message,
      });
      throw new Error(error.message);
    }
  };

  return useMutation("updateUserAvatar", (url: any) => updateUserAvatar(url), {
    onSuccess: () => {
      showSuccessToast({
        title: "Avatar Updated",
        description: "Your Avatar has been updated.",
      });
    },
    // Refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("user");
    },
  });
};
export default useUpdateUserAvatar;
