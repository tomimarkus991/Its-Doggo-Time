import { VStack, Text } from "@chakra-ui/react";

import React from "react";
import { Link } from "react-router-dom";

import { Skeleton } from "components/Skeleton";
import { useFetchGroupData } from "hooks/queries";
import { GroupType } from "types";

import { GroupAvatarCard } from ".";

interface Props {
  group: GroupType;
}
const GroupCard: React.FC<Props> = ({ group }) => {
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

export default GroupCard;
