import { useMutation } from "react-query";
import { useHistory } from "react-router";

import { useAuth } from "context";
import { FoodLogsdataType } from "types";
import { supabase } from "utils";

import { useToast } from "..";

const useEditFoodLog = (group_id: string) => {
  const { user } = useAuth();
  const router = useHistory();
  const { showErrorToast } = useToast();

  const editFoodLog = async (logData: any, time: Date | null | undefined, log_id: string) => {
    let food: boolean;
    if (logData?.includes("food")) {
      food = true;
    } else {
      food = false;
    }

    const values: FoodLogsdataType = {
      food,
      creator_id: user?.id as string,
      group_id,
      created_at: time,
    };

    const { error } = await supabase
      .from("food_logs")
      .update(values, {
        returning: "minimal",
      })
      .eq("id", log_id);

    if (error) {
      showErrorToast({
        title: "Edit Food Log Error",
        description: error.message,
      });
      throw new Error(error.message);
    }
  };

  return useMutation(
    "editFoodLog",
    ({ logData, time, log_id }: { logData: any; time: Date | null | undefined; log_id: string }) =>
      editFoodLog(logData, time, log_id),
    {
      onSuccess: () => {
        router.push(`/group/${group_id}`);
      },
    }
  );
};
export default useEditFoodLog;
