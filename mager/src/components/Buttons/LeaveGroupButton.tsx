import { Button, Flex } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { useLeaveGroup } from '../../hooks/mutations';
import { StringOrUndefined } from '../../types';

interface Props {
  user_id: StringOrUndefined;
  group_id: string;
  creator_id: StringOrUndefined;
}

const LeaveGroupButton: React.FC<Props> = ({
  user_id,
  group_id,
  creator_id,
}) => {
  const router = useHistory();
  const { mutate, isSuccess } = useLeaveGroup(user_id, group_id);

  if (isSuccess) {
    router.push('/');
  }

  return (
    <Flex
      display={{ sm: 'none', lg: 'flex' }}
      w="100%"
      h="40%"
      justifyContent="center"
    >
      <Flex alignSelf="flex-end">
        {user_id !== creator_id && (
          <Button
            onClick={() => mutate()}
            bg="red.500"
            colorScheme="red"
            textTransform="uppercase"
            borderRadius="50"
            color="white"
          >
            Leave group
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default LeaveGroupButton;
