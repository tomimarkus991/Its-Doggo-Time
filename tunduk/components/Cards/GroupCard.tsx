import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Avatar } from '../Account';
import { Link as RouterLink } from 'react-router-dom';
import { GroupProfileIcon } from '../Icons/Profile/GroupProfileIcon';
import { GroupType } from '../../types';

interface Props {
  group: GroupType;
}
export const GroupCard: React.FC<Props> = ({ group }) => {
  return (
    <Box>
      <RouterLink to={`/group/${group.id}`}>
        <Flex alignItems="center" flexDirection="column">
          <Avatar
            src={group.avatar_url}
            size="xl"
            icon={<GroupProfileIcon fontSize="5rem" />}
          />
          <Text fontSize={28} ml="2">
            {group.group_name}
          </Text>
        </Flex>
      </RouterLink>
    </Box>
  );
};
