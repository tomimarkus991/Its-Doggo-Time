import { Center, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GroupAvatarCard } from '.';
import { GroupType } from '../../types';

interface Props {
  group: GroupType;
}
const GroupCard: React.FC<Props> = ({ group }) => {
  const { id, group_name, avatar_url } = group;
  return (
    <Link to={`/group/${id}`}>
      <Center flexDirection="column">
        <GroupAvatarCard src={avatar_url} />
        <Text fontSize={28}>{group_name}</Text>
      </Center>
    </Link>
  );
};

export default GroupCard;
