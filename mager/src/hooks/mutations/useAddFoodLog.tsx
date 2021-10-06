import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { useToast } from '..';
import { useAuth } from '../../context';
import { FoodLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const useAddFoodLog = (group_id: string) => {
  const { user } = useAuth();
  const router = useHistory();
  const { showErrorToast } = useToast();

  const addFoodLog = async (logData: any, time: Date) => {
    let food: boolean;

    if (logData?.includes('food')) {
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

    const { error } = await supabase.from('food_logs').insert(values, {
      returning: 'minimal',
    });

    if (error) {
      showErrorToast({ title: 'Error', description: error.message });
      throw error;
    }
  };

  return useMutation(
    'addFoodLog',
    ({ logData, time }: { logData: any; time: Date }) =>
      addFoodLog(logData, time),
    {
      onSuccess: () => {
        router.push(`/group/${group_id}`);
      },
    },
  );
};
export default useAddFoodLog;
