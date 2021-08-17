import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { InviteDataType } from '../../types';
import { AvatarInvite } from '../Avatar';
import EditButtons from '../Buttons/EditButtons';

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
      layerStyle="shadow-and-bg"
      borderRadius={20}
      py="4"
    >
      <Flex flexDirection="column" alignItems="center">
        <AvatarInvite src={avatar_url} />
        <Box my="4" textAlign="center">
          <Text fontSize={20}>
            <strong>{sender}</strong> invites you
          </Text>
          <Text fontSize={18}>to join A group called</Text>
          <Text fontSize={28}>
            <strong> &#34;{group_name}&#34;</strong>
          </Text>
        </Box>
        <EditButtons
          buttonGroupProps={{ spacing: '7' }}
          onCrossClick={() => declineInvite(id)}
          onCheckClick={() => acceptInvite(groups.id, id)}
        />
      </Flex>
    </Box>
  );
};
