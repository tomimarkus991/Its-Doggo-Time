import { Button, Flex } from '@chakra-ui/react';
import { useDeleteGroup } from '../../../hooks/api';
import { StringOrUndefined } from '../../../types';

interface Props {
  user_id: StringOrUndefined;
  group_id: string;
  creator_id: StringOrUndefined;
  isEditable: boolean;
}

const DeleteGroupButton: React.FC<Props> = ({
  user_id,
  group_id,
  creator_id,
  isEditable,
}) => {
  const deleteGroup = useDeleteGroup(group_id);
  return (
    <Flex alignSelf="flex-end">
      {user_id === creator_id && isEditable ? (
        <Button
          onClick={deleteGroup}
          colorScheme="red"
          textTransform="uppercase"
          borderRadius="50"
        >
          Delete group
        </Button>
      ) : null}
    </Flex>
  );
};
export default DeleteGroupButton;
