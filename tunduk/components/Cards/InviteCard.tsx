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
  const { id, groups, sender } = invite;
  const { avatar_url, group_name } = groups;
  return (
    <Box
      boxSizing="border-box"
      style={{ boxShadow: '1px 1px 8px 2px #DDCDBF' }}
      borderRadius={20}
      py="4"
    >
      <Flex flexDirection="column" alignItems="center">
        <AvatarInvite src={avatar_url} />
        <Box my="4" textAlign="center">
          <Text fontSize={20}>
            <strong>{sender}</strong> invites you
          </Text>
          <Text fontSize={18}>to join group called</Text>
          <Text fontSize={28}>
            <strong> &#34;{group_name}&#34;</strong>
          </Text>
        </Box>

        <HStack spacing="7">
          <IconButton
            aria-label="decline"
            borderRadius="100"
            bgColor="red.500"
            icon={<FontAwesomeIcon icon={faTimes} />}
            onClick={() => declineInvite(id)}
          />
          <IconButton
            aria-label="accept"
            borderRadius="100"
            bgColor="green.400"
            icon={<FontAwesomeIcon icon={faCheck} />}
            onClick={() => acceptInvite(groups.id, id)}
          />
        </HStack>
      </Flex>
    </Box>
  );
};
