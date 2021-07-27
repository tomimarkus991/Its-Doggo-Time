import { Flex, Text } from '@chakra-ui/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ProfileType } from '../../types';
import { AvatarCard } from '../Avatar';

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
        icon={<FontAwesomeIcon icon={faUser} size="2x" />}
      />
      <Text fontSize={28}>{username}</Text>
    </Flex>
  );
};
