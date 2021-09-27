import { useEffect } from 'react';
import { useLogs } from '../../context';
import { ExcrementLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToExcrementLogInserts = (group_id: string) => {
  const { setExcrementLogs } = useLogs();
  useEffect(() => {
    const subscribeToLogInserts = () =>
      supabase
        .from(`excrement_logs:group_id=eq.${group_id}`)
        .on('INSERT', payload => {
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

          setExcrementLogs(oldData => {
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
