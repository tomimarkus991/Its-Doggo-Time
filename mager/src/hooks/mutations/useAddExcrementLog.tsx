import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { useToast } from '..';
import { useAuth } from '../../context';
import { ExcrementLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const useAddExcrementLog = (group_id: string) => {
  const { user } = useAuth();
  const router = useHistory();
  const { showErrorToast } = useToast();

  const addExcrementLog = async (logData: any, time: Date) => {
    let pee: boolean;
    let poop: boolean;
    if (logData?.includes('pee')) {
      pee = true;
    } else {
      pee = false;
    }
    if (logData?.includes('poop')) {
      poop = true;
    } else {
      poop = false;
    }

    const values: ExcrementLogsdataType = {
      pee,
      poop,
      creator_id: user?.id as string,
      group_id,
      created_at: time,
    };

    const { error } = await supabase
      .from('excrement_logs')
      .insert(values, {
        returning: 'minimal',
      });

    if (error) {
      showErrorToast({
        title: 'Add Excrement Log Error',
        description: error.message,
      });
      throw error;
    }
  };

  return useMutation(
    'addExcrementLog',
    ({ logData, time }: { logData: any; time: Date }) =>
      addExcrementLog(logData, time),
    {
      onSuccess: () => {
        router.push(`/group/${group_id}`);
      },
    },
  );
};
export default useAddExcrementLog;
