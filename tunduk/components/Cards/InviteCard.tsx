import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { InviteDataType } from '../../types';
import { AvatarInvite } from '../Avatar';

interface Props {
  invite: InviteDataType;
  declineInvite: (invite_id: string) => void;
  acceptInvite: (group_id: string, invite_id: string) => void;
}

export const InviteCard: React.FC<Props> = ({
  invite,
  declineInvite,
  acceptInvite,
}) => {
  const { id, group, sender } = invite;
  const { avatar_url, group_name } = group;
  return (
    <Box
      boxSizing="border-box"
      border="1px"
      borderColor="gray.300"
      borderRadius={20}
      py="4"
    >
      <Flex flexDirection="column" alignItems="center">
        <AvatarInvite src={avatar_url} />
        <Text maxW="10.5rem" textAlign="center" mb={3}>
          <strong>{sender}</strong> invites you to <br /> join group called{' '}
          <br />
          <strong> "{group_name}"</strong>
        </Text>
        <HStack spacing="7">
          <IconButton
            aria-label="decline"
            bgColor="red.500"
            icon={<FontAwesomeIcon icon={faTimes} />}
            onClick={() => declineInvite(id)}
          />
          <IconButton
            aria-label="accept"
            bgColor="green.400"
            icon={<FontAwesomeIcon icon={faCheck} />}
            onClick={() => acceptInvite(group.id, id)}
          />
        </HStack>
      </Flex>
    </Box>
  );
};