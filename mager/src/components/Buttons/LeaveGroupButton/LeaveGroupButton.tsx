import { Button, Flex } from '@chakra-ui/react';
import { useLeaveGroup } from '../../../hooks/api';
import { StringOrUndefined } from '../../../types';

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
  const leaveGroup = useLeaveGroup(user_id, group_id);
  return (
    <Flex
      display={{ sm: 'none', lg: 'flex' }}
      w="100%"
      h="40%"
      justifyContent="center"
    >
      <Flex alignSelf="flex-end">
        {user_id !== creator_id ? (
          <Button
            onClick={leaveGroup}
            bg="red.500"
            colorScheme="red"
            textTransform="uppercase"
            borderRadius="50"
            color="white"
          >
            Leave group
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
};
export default LeaveGroupButton;
