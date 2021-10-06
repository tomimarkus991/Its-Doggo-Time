import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { useToast } from '..';
import { useAuth } from '../../context';
import { ExcrementLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const useEditExcrementLog = (group_id: string) => {
  const { user } = useAuth();
  const router = useHistory();
  const { showErrorToast } = useToast();

  const editExcrementLog = async (
    logData: any,
    time: Date,
    log_id: string,
  ) => {
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
      .update(values, {
        returning: 'minimal',
      })
      .eq('id', log_id);

    if (error) {
      showErrorToast({ title: 'Error', description: error.message });
      throw error;
    }
  };

  return useMutation(
    'editExcrementLog',
    ({
      logData,
      time,
      log_id,
    }: {
      logData: any;
      time: Date;
      log_id: string;
    }) => editExcrementLog(logData, time, log_id),
    {
      onSuccess: () => {
        router.push(`/group/${group_id}`);
      },
    },
  );
};
export default useEditExcrementLog;
