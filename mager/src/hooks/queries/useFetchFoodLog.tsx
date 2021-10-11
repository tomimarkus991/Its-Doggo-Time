import { useQuery } from 'react-query';
import { useToast } from '..';
import { useLogs } from '../../context';
import { FoodLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const useFetchFoodLog = (log_id: string, group_id: string) => {
  const { showErrorToast } = useToast();
  const { setLogCheckboxData: setLogData, setTime } = useLogs();

  const fetchFoodLog = async () => {
    setLogData([]);
    let { data: _data, error } = await supabase
      .from('food_logs')
      .select(
        `
      id,
      created_at,
      food
  `,
      )
      .eq('id', log_id)
      .single();

    let data: FoodLogsdataType = _data;

    if (error) {
      showErrorToast({
        title: 'Fetch Food Log Error',
        description: error.message,
      });
      throw new Error(error.message);
    }

    return data;
  };
  return useQuery('food_log' + log_id + group_id, () => fetchFoodLog(), {
    onSuccess: data => {
      setTime(data?.created_at as Date);

      if (data?.food) {
        setLogData((oldData: any) => [...oldData, 'food']);
      }
    },
  });
};
export default useFetchFoodLog;
