import { useMutation, useQueryClient } from "react-query";

import { supabase } from "utils";

import { useToast } from "..";
import { useFetchGroupData } from "../queries";

const useUpdateGroupname = (id: string) => {
  const { showErrorToast, showSuccessToast } = useToast();
  const queryClient = useQueryClient();
  const { data: group } = useFetchGroupData(id);

  const updateGroupname = async (group_name: string | undefined) => {
    const updates = {
      id,
      group_name,
      updated_at: new Date(),
    };

    if (group_name && group_name !== group?.group_name) {
      const { data, error } = await supabase.from("groups").upsert(updates);

      if (error) {
        showErrorToast({
          title: "Update Groupname Error",
          description: error.message,
        });
        throw new Error(error.message);
      }
      return data;
    } else {
      return undefined;
    }
  };

  return useMutation(
    "updateGroupname",
    (groupname: string | undefined) => updateGroupname(groupname),
    {
      onSuccess: data => {
        if (data) {
          showSuccessToast({
            title: "Group Updated",
            description: "Your Group has been updated.",
          });
        }
      },
      // Refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries("group" + id);
      },
    }
  );
};
export default useUpdateGroupname;
