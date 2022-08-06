import { useQuery } from "react-query";

import { supabase } from "utils";

import { FoodLogsdataType } from "types";

import { useToast } from "..";

export const useFetchFoodLogs = (group_id: string) => {
  const { showErrorToast } = useToast();

  const getFoodLogsdata = async () => {
    // gets the 4 most recent logs
    const { data, error } = await supabase
      .from("food_logs")
      .select(
        `
          id,
          food,
          created_at
          `
      )
      .eq("group_id", group_id)
      .order("created_at", { ascending: false })
      .limit(4);
    const _data = data as FoodLogsdataType[];

    if (error) {
      showErrorToast({
        title: "Fetch Food Logs Error",
        description: error.message,
      });
      throw new Error(error.message);
    }

    const sortedData = _data.sort(
      (a, b) => new Date(a.created_at as Date).valueOf() - new Date(b.created_at as Date).valueOf()
    );

    return sortedData;
  };

  return useQuery(["food_logs", group_id], () => getFoodLogsdata());
};
