import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GroupType } from '../../types';
import { AvatarCard } from '../Avatar';
import { GroupProfileIcon } from '../Icons/Profile/GroupProfileIcon';

interface Props {
  group: GroupType;
}
export const GroupCard: React.FC<Props> = ({ group }) => {
  const { id, group_name, avatar_url } = group;
  return (
    <Box>
      <Link to={`/group/${id}`}>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <AvatarCard
            src={avatar_url}
            icon={<GroupProfileIcon fontSize="5rem" />}
          />
          <Text fontSize={28}>{group_name}</Text>
        </Flex>
      </Link>
    </Box>
  );
};
