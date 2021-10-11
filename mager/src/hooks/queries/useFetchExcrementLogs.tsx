import { useQuery } from 'react-query';
import { useToast } from '..';
import { ExcrementLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const useFetchExcrementLogs = (group_id: string) => {
  const { showErrorToast } = useToast();

  const getExcrementLogsdata = async () => {
    // gets the 4 most recent logs
    const { data, error } = await supabase
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

    if (error) {
      showErrorToast({
        title: 'Fetch Excrement Logs Error',
        description: error.message,
      });
      throw new Error(error.message);
    }

    let _data = data as ExcrementLogsdataType[];

    const sortedData = _data.sort(
      (a, b) =>
        new Date(a.created_at as Date).valueOf() -
        new Date(b.created_at as Date).valueOf(),
    );

    return sortedData;
  };

  return useQuery('excrement_logs' + group_id, () =>
    getExcrementLogsdata(),
  );
};

export default useFetchExcrementLogs;
