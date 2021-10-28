import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { useToast } from '..';
import { useAuth } from '../../context';
import { ExcrementLogsdataType } from '../../types';
import { sortExcrementLogs, supabase } from '../../utils';

type AddLogType = {
  logData: any;
  time: Date;
};

const useAddExcrementLog = (group_id: string) => {
  const { user } = useAuth();
  const router = useHistory();
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  const addExcrementLog = async ({ logData, time }: AddLogType) => {
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

    const { data, error } = await supabase
      .from('excrement_logs')
      .insert(values)
      .single();

    if (error) {
      showErrorToast({
        title: 'Add Excrement Log Error',
        description: error.message,
      });

      throw new Error(error.message);
    }

    return data;
  };

  return useMutation(
    'addExcrementLog',
    ({ logData, time }: AddLogType) => addExcrementLog({ logData, time }),
    {
      onMutate: (newLog: any) => {
        const previousLogs = queryClient.getQueryData([
          'excrement_logs',
          group_id,
        ]);

        queryClient.setQueryData(
          ['excrement_logs', group_id],
          (oldData: any) => {
            return sortExcrementLogs({ oldData, newLog });
          },
        );

        router.push(`/group/${group_id}`);

        return { previousLogs };
      },
      onError: (_, __, context: any) => {
        queryClient.setQueryData(
          ['excrement_logs', group_id],
          context.previousLogs,
        );
      },
      // Refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(['excrement_logs', group_id]);
      },
    },
  );
};
export default useAddExcrementLog;
