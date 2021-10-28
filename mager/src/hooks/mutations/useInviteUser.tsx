import { useMutation } from 'react-query';
import { useToast } from '..';
import { InviteDataType } from '../../types';
import { supabase } from '../../utils';
import { useUser } from '../queries';

type InviteUserType = {
  inviteReceiver: string;
  group_id: string;
};

const useInviteUser = () => {
  const { data: user } = useUser();
  const { showErrorToast, showSuccessToast } = useToast();

  const inviteUser = async ({
    inviteReceiver,
    group_id,
  }: InviteUserType) => {
    // finds if there are any members with {inviteReceiver} username
    const { data: findUserData, error: findUserError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', inviteReceiver);

    if (findUserData?.length === 0 || findUserError) {
      showErrorToast({
        title: 'FRIEND REQUEST FAILED',
        description: `Hm, that didn't work. Double check that the capitalization,
        spelling, any spaces, and numbers are correct.`,
      });

      throw new Error(findUserError?.message);
    }

    const values = {
      receiver: inviteReceiver,
      sender: user?.username,
      group_id,
    };

    const { data, error } = await supabase
      .from('invites')
      .insert(values)
      .single();

    if (error) {
      showErrorToast({
        title: 'Add Invite Error',
        description: error.message,
      });

      throw new Error(error.message);
    }
    return data;
  };

  return useMutation(
    'inviteUser',
    ({ inviteReceiver, group_id }: InviteUserType) =>
      inviteUser({
        inviteReceiver,
        group_id,
      }),
    {
      onSuccess: (data: InviteDataType) => {
        showSuccessToast({
          title: `${data.receiver} Invited`,
          description: `${data.receiver} has been successfully Invited`,
          position: 'top',
        });
      },
    },
  );
};
export default useInviteUser;
