import { VStack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { useFetchGroupData } from "hooks";

import { Skeleton } from "components";

import { GroupType } from "types";

import { GroupAvatarCard } from ".";

interface Props {
  group: GroupType;
}

export const GroupCard = ({ group }: Props) => {
  const { id: group_id } = group;

  const { data, isLoading } = useFetchGroupData(group_id);

  return (
    <Link to={`/group/${group_id}`}>
      <VStack>
        <Skeleton isLoading={isLoading}>
          <GroupAvatarCard path={data?.avatar_url} />
        </Skeleton>
        <Skeleton isLoading={isLoading}>
          <Text fontSize={28}>{String(data?.group_name)}</Text>
        </Skeleton>
      </VStack>
    </Link>
  );
};
