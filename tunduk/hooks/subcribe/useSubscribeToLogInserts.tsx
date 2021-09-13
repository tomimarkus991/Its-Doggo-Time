import { LogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useSubscribeToLogInserts = ({
  group_id,
  setLogsdata,
}: {
  group_id: string;
  setLogsdata: React.Dispatch<React.SetStateAction<LogsdataType[]>>;
}) => {
  return {
    subscribeToLogInserts: () =>
      supabase
        .from(`logs:group_id=eq.${group_id}`)
        .on('INSERT', payload => {
          const { created_at, creator_id, group_id, id, pee, poop } =
            payload.new as LogsdataType;

          const newLog: LogsdataType = {
            created_at,
            creator_id,
            group_id,
            id,
            pee,
            poop,
          };

          setLogsdata(oldData => {
            if (oldData.length <= 3) {
              return [...oldData, newLog];
            } else {
              const newData = oldData.slice(1);
              return [...newData, newLog];
            }
          });
        })
        .subscribe(),
  };
};
