import { useQuery } from "react-query";

import { useLogs } from "context";

import { supabase } from "utils";

import { FoodLogsdataType } from "types";

import { useToast } from "..";

export const useFetchFoodLog = (log_id: string, group_id: string) => {
  const { showErrorToast } = useToast();
  const { setLogCheckboxData: setLogData, setTime } = useLogs();

  const fetchFoodLog = async () => {
    setLogData([]);
    const { data: _data, error } = await supabase
      .from("food_logs")
      .select(
        `
      id,
      created_at,
      food
  `
      )
      .eq("id", log_id)
      .single();

    const data: FoodLogsdataType = _data;

    if (error) {
      showErrorToast({
        title: "Fetch Food Log Error",
        description: error.message,
      });
      throw new Error(error.message);
    }

    return data;
  };
  return useQuery(["food_log", log_id, group_id], () => fetchFoodLog(), {
    onSuccess: data => {
      setTime(data?.created_at as Date);

      if (data?.food) {
        setLogData((oldData: any) => [...oldData, "food"]);
      }
    },
  });
};
