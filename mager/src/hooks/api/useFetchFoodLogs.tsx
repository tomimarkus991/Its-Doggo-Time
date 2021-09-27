import { useState, useEffect } from 'react';
import { useLogs } from '../../context';
import { FoodLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useFetchFoodLogs = (group_id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setFoodLogs } = useLogs();

  useEffect(() => {
    const getLogsdata = async () => {
      try {
        setIsLoading(true);
        // gets the 4 most recent logs
        const { data } = await supabase
          .from('food_logs')
          .select(
            `
          id,
          food,
          created_at
          `,
          )
          .eq('group_id', group_id)
          .order('created_at', { ascending: false })
          .limit(4);
        let _data = data as FoodLogsdataType[];

        const sortedData = _data.sort(
          (a, b) =>
            new Date(a.created_at as Date).valueOf() -
            new Date(b.created_at as Date).valueOf(),
        );
        setFoodLogs(sortedData);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    getLogsdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading };
};
