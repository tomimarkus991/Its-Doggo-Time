import { useQuery } from 'react-query';
import { useToast } from '..';
import { useLogs } from '../../context';
import { ExcrementLogsdataType } from '../../types';
import { supabase } from '../../utils';

const useFetchExcrementLog = (log_id: string, group_id: string) => {
  const { showErrorToast } = useToast();
  const { setLogCheckboxData: setLogData, setTime } = useLogs();

  const fetchExcrementLog = async () => {
    setLogData([]);
    let { data: _data, error } = await supabase
      .from('excrement_logs')
      .select(
        `
          id,
          pee,
          poop,
          created_at
      `,
      )
      .eq('id', log_id)
      .single();

    let data: ExcrementLogsdataType = _data;

    if (error) {
      showErrorToast({
        title: 'Fetch Excrement Log Error',
        description: error.message,
      });
      throw new Error(error.message);
    }

    return data;
  };
  return useQuery(
    ['excrement_log', log_id, group_id],
    () => fetchExcrementLog(),
    {
      onSuccess: data => {
        setTime(data?.created_at as Date);

        if (data?.pee) {
          setLogData((oldData: any) => [...oldData, 'pee']);
        }
        if (data?.poop) {
          setLogData((oldData: any) => [...oldData, 'poop']);
        }
      },
    },
  );
};
export default useFetchExcrementLog;