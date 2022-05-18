import { useQuery } from "react-query";

import { useToast } from "..";
import { UserType } from "../../types";
import { supabase } from "../../utils";

const useUser = () => {
  const user = supabase.auth.user();
  const { showErrorToast } = useToast();

  const fetchUser = async () => {
    const { data: _data, error } = await supabase
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

    const data = _data as UserType;

    if (error) {
      showErrorToast({
        title: "Fetch User Error",
        description: error.message,
      });
      throw new Error(error.message);
    }

    if (!data) {
      showErrorToast({
        title: "Fetch User Error",
        description: "User not found",
      });
      throw new Error("User not found");
    }

    return data;
  };

  return useQuery("user", () => fetchUser());
};

export default useUser;
