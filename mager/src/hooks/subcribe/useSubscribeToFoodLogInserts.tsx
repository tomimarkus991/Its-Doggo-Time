import { useEffect } from 'react';
import { useLogs } from '../../context';
import { FoodLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToFoodLogInserts = (group_id: string) => {
  const { setFoodLogs } = useLogs();
  useEffect(() => {
    const subscribeToLogInserts = () =>
      supabase
        .from(`food_logs:group_id=eq.${group_id}`)
        .on('INSERT', payload => {
          const { id, created_at, creator_id, group_id, food } =
            payload.new as FoodLogsdataType;

          const newLog: FoodLogsdataType = {
            id,
            created_at,
            creator_id,
            group_id,
            food,
          };

          setFoodLogs(oldData => {
            if (oldData.length <= 3) {
              return [...oldData, newLog];
            } else {
              const newData = oldData.slice(1);
              return [...newData, newLog];
            }
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
