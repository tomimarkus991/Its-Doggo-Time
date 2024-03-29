import { DeleteIcon } from "@chakra-ui/icons";

import { IconButton, Text, VStack } from "@chakra-ui/react";

import { useColors, useRemoveGroupMember } from "hooks";

import { MemberType, StringOrUndefined } from "types";

import { ProfileAvatarCard } from ".";

interface Props {
  member: MemberType;
  isEditable: boolean;
  group_id: string;
  creator_id: StringOrUndefined;
}

export const MemberCard = ({ member, isEditable, group_id, creator_id }: Props) => {
  const { id: user_id, username, avatar_url } = member;
  const { containerBackgroundColor } = useColors();

  const { mutate } = useRemoveGroupMember();

  return (
    <VStack spacing={0} position="relative">
      <ProfileAvatarCard src={avatar_url} />
      <Text fontSize={{ base: "23", sm: "24", md: "28", lg: "28" }}>{username}</Text>

      {creator_id !== user_id && isEditable && (
        <IconButton
          aria-label="Remove"
          colorScheme="red"
          size="md"
          icon={<DeleteIcon color="red.500" fontSize={"1.3rem"} />}
          bgColor={containerBackgroundColor}
          border="2px"
          borderColor="beez.700"
          position="absolute"
          cursor="pointer"
          onClick={() => mutate({ user_id, group_id })}
          right={{ base: "0", sm: "5%" }}
          bottom="25%"
          isRound
        />
      )}
    </VStack>
  );
};
