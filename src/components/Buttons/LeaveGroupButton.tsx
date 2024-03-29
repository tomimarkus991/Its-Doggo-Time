import { Button, Flex } from "@chakra-ui/react";

import { useNavigate } from "react-router";

import { useAuth } from "context";

import { useLeaveGroup, useFetchGroupData } from "hooks";

interface Props {
  group_id: string;
}

export const LeaveGroupButton = ({ group_id }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate, isSuccess } = useLeaveGroup(user?.id, group_id);
  const { data } = useFetchGroupData(group_id);

  if (isSuccess) {
    navigate("/");
  }

  return (
    <Flex display={{ sm: "none", lg: "flex" }} w="100%" h="40%" justifyContent="center">
      <Flex alignSelf="flex-end">
        {user?.id !== data?.creator_id && (
          <Button
            onClick={() => mutate()}
            bg="red.500"
            colorScheme="red"
            textTransform="uppercase"
            borderRadius="50"
            color="white"
            isDisabled={false}
          >
            Leave group
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
