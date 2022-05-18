import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router";

import { useToast } from "..";
import { useAuth } from "context";
import { FoodLogsdataType } from "types";
import { sortFoodLogs, supabase } from "utils";

type AddLogType = {
  logData: any;
  time: Date;
};

const useAddFoodLog = (group_id: string) => {
  const { user } = useAuth();
  const router = useHistory();
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  const addFoodLog = async ({ logData, time }: AddLogType) => {
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

    const { data, error } = await supabase.from("food_logs").insert(values).single();

    if (error) {
      showErrorToast({
        title: "Add Food Log Error",
        description: error.message,
      });

      throw new Error(error.message);
    }

    return data;
  };

  return useMutation(
    "addFoodLog",
    ({ logData, time }: AddLogType) => addFoodLog({ logData, time }),
    {
      onMutate: (newLog: any) => {
        const previousLogs = queryClient.getQueryData(["food_logs", group_id]);

        queryClient.setQueryData(["food_logs", group_id], (oldData: any) => {
          return sortFoodLogs({ oldData, newLog });
        });

        router.push(`/group/${group_id}`);

        return { previousLogs };
      },
      onError: (_, __, context: any) => {
        queryClient.setQueryData(["food_logs", group_id], context.previousLogs);
      },
      // Refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(["food_logs", group_id]);
      },
    }
  );
};
export default useAddFoodLog;
