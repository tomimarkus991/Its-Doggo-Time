import { useMutation, useQueryClient } from "react-query";

import { useAuth } from "context";
import { StringOrUndefined } from "types";
import { supabase } from "utils";

import { useToast } from "..";
import { useUser } from "../queries";

const useUpdateUsername = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const { user: userAuth } = useAuth();

  const updateUsername = async (username: StringOrUndefined) => {
    const profile_updates = {
      id: userAuth?.id,
      username,
      updated_at: new Date(),
    };

    // Check if Username has value and it has changed
    if (username && username !== user?.username) {
      // update username
      const { data, error } = await supabase.from("profiles").upsert(profile_updates).single();

      if (error?.message.includes("duplicate key")) {
        showErrorToast({
          title: "Update Username Error",
          description: "User with username exists",
        });
        throw new Error("User with username exists");
      }

      if (error) {
        showErrorToast({
          title: "Update Username Error",
          description: error.message,
        });
        throw new Error(error.message);
      }

      // delete all invites for that user
      await supabase
        .from("invites")
        .delete()
        .eq("sender", user?.username)
        .eq("receiver", user?.username);

      return data;
    } else {
      return null;
    }
  };

  return useMutation("updateUsername", (username: StringOrUndefined) => updateUsername(username), {
    onSuccess: async data => {
      if (data) {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        // await queryClient.cancelQueries('user');

        // Optimistically update to the new value
        // queryClient.setQueryData(
        // 'user',
        // (oldData: any) => (oldData.username = data.username),
        // );

        showSuccessToast({
          title: "Profile Updated",
          description: "Your Profile has been updated.",
        });
      }
    },
    // Refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("user");
    },
  });
};
export default useUpdateUsername;
