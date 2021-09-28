import { useState, useEffect } from 'react';
import { useLogs } from '../../context';
import { ExcrementLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useFetchExcrementLogs = (group_id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setExcrementLogs } = useLogs();
  useEffect(() => {
    const getLogsdata = async () => {
      try {
        setIsLoading(true);
        // gets the 4 most recent logs
        const { data } = await supabase
          .from('excrement_logs')
          .select(
            `
          id,
          pee,
          poop,
          created_at
          `,
          )
          .eq('group_id', group_id)
          .order('created_at', { ascending: false })
          .limit(4);
        let _data = data as ExcrementLogsdataType[];

        const sortedData = _data.sort(
          (a, b) =>
            new Date(a.created_at as Date).valueOf() -
            new Date(b.created_at as Date).valueOf(),
        );
        setExcrementLogs(sortedData);
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