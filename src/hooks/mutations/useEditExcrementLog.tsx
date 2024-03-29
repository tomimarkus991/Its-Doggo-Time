import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

import { useAuth } from "context";

import { supabase } from "utils";

import { ExcrementLogsdataType } from "types";

import { useToast } from "..";

export const useEditExcrementLog = (group_id: string) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  const editExcrementLog = async (logData: any, time: Date | null | undefined, log_id: string) => {
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

    const { error } = await supabase
      .from("excrement_logs")
      .update(values, {
        returning: "minimal",
      })
      .eq("id", log_id);

    if (error) {
      showErrorToast({
        title: "Edit Excrement Log Error",
        description: error.message,
      });

      throw new Error(error.message);
    }
  };

  return useMutation(
    "editExcrementLog",
    ({ logData, time, log_id }: { logData: any; time: Date | null | undefined; log_id: string }) =>
      editExcrementLog(logData, time, log_id),
    {
      onSuccess: () => {
        navigate(`/group/${group_id}`);
      },
      // Refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(["excrement_logs", group_id]);
      },
    }
  );
};
