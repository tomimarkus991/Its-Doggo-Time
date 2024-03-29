import { Box, Center, Text } from "@chakra-ui/react";

import { EditButtons, AvatarInvite } from "components";

import { InviteDataType } from "types";

interface Props {
  invite: InviteDataType;
  declineInvite: (invite_id: string) => void;
  acceptInvite: (group_id: string, invite_id: string) => void;
}

export const InviteCard = ({ invite, declineInvite, acceptInvite }: Props) => {
  const { id, groups, sender } = invite;
  const { avatar_url, group_name } = groups;
  return (
    <Box
      id="InviteCard"
      boxSizing="border-box"
      layerStyle="shadow-and-bg"
      borderRadius={20}
      py="4"
      w="100%"
    >
      <Center flexDirection="column">
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
          buttonGroupProps={{ spacing: "7" }}
          onCrossClick={() => declineInvite(id)}
          onCheckClick={() => acceptInvite(groups.id, id)}
        />
      </Center>
    </Box>
  );
};
