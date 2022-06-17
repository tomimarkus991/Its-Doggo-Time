import { Button, Flex } from "@chakra-ui/react";

import { useHistory } from "react-router";

import { useDeleteGroup } from "hooks";
import { StringOrUndefined } from "types";

interface Props {
  user_id: StringOrUndefined;
  group_id: string;
  creator_id: StringOrUndefined;
  isEditable: boolean;
}

export const DeleteGroupButton = ({ user_id, group_id, creator_id, isEditable }: Props) => {
  const router = useHistory();
  const { mutate, isSuccess } = useDeleteGroup(group_id);

  if (isSuccess) {
    router.push("/");
  }

  return (
    <Flex alignSelf="flex-end">
      {user_id === creator_id && isEditable && (
        <Button
          onClick={() => mutate()}
          bg="red.500"
          colorScheme="red"
          textTransform="uppercase"
          borderRadius="50"
          color="white"
          isDisabled={false}
        >
          Delete group
        </Button>
      )}
    </Flex>
  );
};
