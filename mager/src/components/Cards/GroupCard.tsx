import { VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GroupAvatarCard } from '.';
import { GroupType } from '../../types';
import { Skeleton } from '../../components/Skeleton';
import { useFetchGroupData } from '../../hooks/queries';

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
