import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '..';
import { supabase } from '../../utils/supabaseClient';
import { useFetchGroupData } from '../queries';

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
      let { data, error } = await supabase.from('groups').upsert(updates);

      if (error) {
        showErrorToast({
          title: 'Error',
          description: error.message,
        });
        throw error;
      }
      return data;
    } else {
      return undefined;
    }
  };

  return useMutation(
    'updateGroupname',
    (groupname: string | undefined) => updateGroupname(groupname),
    {
      onSuccess: data => {
        queryClient.refetchQueries('group' + id);
        if (data) {
          showSuccessToast({
            title: 'Group Updated',
            description: 'Your Group has been updated.',
          });
        }
      },
    },
  );
};
export default useUpdateGroupname;