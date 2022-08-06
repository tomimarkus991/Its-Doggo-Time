import { useQuery } from "react-query";

import { supabase } from "utils";

import { GroupPageDataType } from "types";

import { useToast } from "..";

export const useFetchGroupData = (group_id: string) => {
  const { showErrorToast } = useToast();

  const fetchGroupData = async () => {
    const { data, error } = await supabase
      .from("groups")
      .select(
        `
        id,
        group_name,
        avatar_url,
        creator_id,
        profiles (id, username, avatar_url)
        `
      )
      .eq("id", group_id)
      .single();

    if (error) {
      showErrorToast({
        title: "Fetch Group Data Error",
        description: error.message,
      });
      throw new Error(error.message);
    }

    const _groupData: GroupPageDataType = data;

    return _groupData;
  };

  return useQuery(["group", group_id], () => fetchGroupData());
};
