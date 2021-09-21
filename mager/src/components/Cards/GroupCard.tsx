import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GroupType } from '../../types';
import { GroupAvatarCard } from '../Avatar/Cards';

interface Props {
  group: GroupType;
}
export const GroupCard: React.FC<Props> = ({ group }) => {
  const { id, group_name, avatar_url } = group;
  return (
    <Link to={`/group/${id}`}>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <GroupAvatarCard src={avatar_url} />
        <Text fontSize={28}>{group_name}</Text>
      </Flex>
    </Link>
  );
};
