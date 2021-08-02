import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { ProfileType } from '../../types';
import { AvatarCard } from '../Avatar';
import { BlackProfileIcon } from '../Icons/Profile/BlackProfileIcon';

interface Props {
  member: ProfileType;
}

export const MemberCard: React.FC<Props> = ({ member }) => {
  const { username, avatar_url } = member;
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <AvatarCard
        src={avatar_url}
        icon={<BlackProfileIcon w="4.5rem" h="4.5rem" />}
      />
      <Text fontSize={28}>{username}</Text>
    </Flex>
  );
};
