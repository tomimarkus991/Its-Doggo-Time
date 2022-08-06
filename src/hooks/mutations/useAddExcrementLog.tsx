import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

import { useAuth } from "context";

import { sortExcrementLogs, supabase } from "utils";

import { ExcrementLogsdataType } from "types";

import { useToast } from "..";

interface AddLogType {
  logData: any;
  time: Date;
}

export const useAddExcrementLog = (group_id: string) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  const addExcrementLog = async ({ logData, time }: AddLogType) => {
    let pee: boolean;
    let poop: boolean;
    if (logData?.includes("pee")) {
      pee = true;
    } else {
      pee = false;
    }
    if (logData?.includes("poop")) {
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

    const { data, error } = await supabase.from("excrement_logs").insert(values).single();

    if (error) {
      showErrorToast({
        title: "Add Excrement Log Error",
        description: error.message,
      });

      throw new Error(error.message);
    }

    return data;
  };

  return useMutation(
    "addExcrementLog",
    ({ logData, time }: AddLogType) => addExcrementLog({ logData, time }),
    {
      onMutate: (newLog: any) => {
        const previousLogs = queryClient.getQueryData(["excrement_logs", group_id]);

        queryClient.setQueryData(["excrement_logs", group_id], (oldData: any) => {
          return sortExcrementLogs({ oldData, newLog });
        });

        navigate(`/group/${group_id}`);

        return { previousLogs };
      },
      onError: (_, __, context: any) => {
        queryClient.setQueryData(["excrement_logs", group_id], context.previousLogs);
      },
      // Refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(["excrement_logs", group_id]);
      },
    }
  );
};
