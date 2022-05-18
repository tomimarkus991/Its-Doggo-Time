import { useEffect } from "react";
import { useQueryClient } from "react-query";

import { ExcrementLogsdataType } from "../../types";
import { sortExcrementLogs, supabase } from "../../utils";

export const useSubscribeToExcrementLogInserts = (group_id: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscribeToLogInserts = () =>
      supabase
        .from(`excrement_logs:group_id=eq.${group_id}`)
        .on("INSERT", async payload => {
          const { created_at, creator_id, group_id, id, pee, poop } =
            payload.new as ExcrementLogsdataType;

          const newLog: ExcrementLogsdataType = {
            id,
            created_at,
            creator_id,
            group_id,
            pee,
            poop,
          };

          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          // await queryClient.cancelQueries(['excrement_logs', group_id]);

          // Optimistically update to the new value
          queryClient.setQueryData(["excrement_logs", group_id], (oldData: any) => {
            return sortExcrementLogs({ oldData, newLog });
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
