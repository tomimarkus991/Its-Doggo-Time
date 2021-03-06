import { useMutation } from "react-query";

import { supabase } from "utils";

import { InviteDataType } from "types";

import { useToast } from "..";
import { useUser } from "../queries";

interface InviteUser {
  inviteReceiver: string;
  group_id: string;
}

export const useInviteUser = () => {
  const { data: user } = useUser();
  const { showErrorToast, showSuccessToast } = useToast();

  const inviteUser = async ({ inviteReceiver, group_id }: InviteUser) => {
    // finds if there are any members with {inviteReceiver} username
    const { data: findUserData, error: findUserError } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", inviteReceiver);

    if (findUserData?.length === 0 || findUserError) {
      showErrorToast({
        title: "FRIEND REQUEST FAILED",
        description: `Hm, that didn't work. Double check that the capitalization,
        spelling, any spaces, and numbers are correct.`,
      });

      throw new Error(findUserError?.message);
    }

    const values = {
      receiver: inviteReceiver,
      sender: user?.username,
      group_id,
    };

    const { data, error } = await supabase.from("invites").insert(values).single();

    if (error) {
      showErrorToast({
        title: "Add Invite Error",
        description: error.message,
      });

      throw new Error(error.message);
    }
    return data;
  };

  return useMutation(
    "inviteUser",
    ({ inviteReceiver, group_id }: InviteUser) =>
      inviteUser({
        inviteReceiver,
        group_id,
      }),
    {
      onSuccess: (data: InviteDataType) => {
        showSuccessToast({
          title: `${data.receiver} Invited`,
          description: `${data.receiver} has been successfully Invited`,
          position: "top",
        });
      },
    }
  );
};
