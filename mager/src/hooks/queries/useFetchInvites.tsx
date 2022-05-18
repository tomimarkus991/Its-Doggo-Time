import { useQuery } from "react-query";

import { useToast } from "..";
import { InviteDataType, UserType } from "types";
import { supabase } from "utils";

export const useFetchInvites = () => {
  const { showErrorToast } = useToast();
  const user = supabase.auth.user();

  const fetchInvites = async () => {
    const { data: _data, error: fetchUserError } = await supabase
      .from("profiles")
      .select(
        `
        id,
        username,
        avatar_url,
        groups (id, group_name, avatar_url, creator_id, created_at)
      `
      )
      .eq("id", user?.id)
      .order("created_at", { ascending: true, foreignTable: "groups" })
      .single();

    const userData = _data as UserType;

    if (fetchUserError) {
      showErrorToast({
        title: "Fetch User Error",
        description: fetchUserError.message,
      });
      throw new Error(fetchUserError.message);
    }

    if (!userData) {
      showErrorToast({
        title: "Fetch User Error",
        description: "User not found",
      });
      throw new Error("User not found");
    }

    const { data: _invitesdata, error } = await supabase
      .from("invites")
      .select(
        `
        id,
        receiver,
        sender,
        group_id,
        groups (id, group_name, avatar_url)
      `
      )
      .eq("receiver", userData?.username);
    const data = _invitesdata as InviteDataType[];

    if (error) {
      showErrorToast({
        title: "Fetch Invites Error",
        description: error.message,
      });
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery("invites", () => fetchInvites());
};

export default useFetchInvites;
