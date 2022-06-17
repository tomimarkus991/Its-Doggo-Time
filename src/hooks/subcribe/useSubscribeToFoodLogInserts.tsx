import { useEffect } from "react";
import { useQueryClient } from "react-query";

import { sortFoodLogs, supabase } from "utils";

import { FoodLogsdataType } from "types";

export const useSubscribeToFoodLogInserts = (group_id: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscribeToLogInserts = () =>
      supabase
        .from(`food_logs:group_id=eq.${group_id}`)
        .on("INSERT", payload => {
          const { id, created_at, creator_id, group_id, food } = payload.new as FoodLogsdataType;

          const newLog: FoodLogsdataType = {
            id,
            created_at,
            creator_id,
            group_id,
            food,
          };

          queryClient.setQueryData(["excrement_logs", group_id], (oldData: any) => {
            return sortFoodLogs({ oldData, newLog });
          });
        })
        .subscribe();

    subscribeToLogInserts();

    return () => {
      supabase.removeSubscription(subscribeToLogInserts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
