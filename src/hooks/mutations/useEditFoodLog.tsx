import { useMutation } from "react-query";
import { useNavigate } from "react-router";

import { useAuth } from "context";

import { supabase } from "utils";

import { FoodLogsdataType } from "types";

import { useToast } from "..";

export const useEditFoodLog = (group_id: string) => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        navigate(`/group/${group_id}`);
      },
    }
  );
};
