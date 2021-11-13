import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '..';
import { supabase } from '../../utils';

type DeclineInviteType = {
  invite_id: string;
};

const useDeclineInvite = () => {
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  const declineInvite = async ({ invite_id }: DeclineInviteType) => {
    let { data, error } = await supabase
      .from('invites')
      .delete()
      .eq('id', invite_id)
      .single();

    if (error) {
      showErrorToast({
        title: 'Decline Invite Error',
        description: error.message,
      });

      throw new Error(error.message);
    }

    return data;
  };

  return useMutation(
    'declineInvite',
    ({ invite_id }: DeclineInviteType) => declineInvite({ invite_id }),
    {
      // onSuccess: async () => {
      //   queryClient.setQueryData('invites', (oldData: any) => {
      //     console.log('onSuccess oldData', oldData);

      //     // return oldData?.filter(
      //     //   (data: InviteDataType) => data.id !== invite.invite_id,
      //     // );
      //   });
      // },
      // Refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('invites');
      },
    },
  );
};
export default useDeclineInvite;