import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GroupType } from '../../types';
import { GroupAvatarCard } from '../Avatar/Cards';

interface Props {
  group: GroupType;
  key: number;
}
export const GroupCard: React.FC<Props> = ({ group, key }) => {
  const { id, group_name, avatar_url } = group;
  return (
    <Box key={key}>
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
    </Box>
  );
};
