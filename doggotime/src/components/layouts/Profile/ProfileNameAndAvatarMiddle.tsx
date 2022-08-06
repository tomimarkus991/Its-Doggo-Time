import { Box, HStack } from "@chakra-ui/react";

import { Skeleton, Name, AvatarProfile } from "components";

import { useUser } from "hooks";

interface Props {
  isUsernameLoading?: boolean;
  isUserAvatarLoading?: boolean;
}

export const ProfileNameAndAvatarMiddle = ({ isUsernameLoading, isUserAvatarLoading }: Props) => {
  const { data, isLoading } = useUser();

  return (
    <HStack id="profile middle" display={{ base: "flex", sm: "none" }}>
      <Skeleton isLoading={isLoading || isUserAvatarLoading}>
        <Box mr={2}>
          <AvatarProfile src={data?.avatar_url} />
        </Box>
      </Skeleton>
      <Skeleton isLoading={isLoading || isUsernameLoading}>
        <Name
          name={String(data?.username)}
          textProps={{
            fontSize: "4xl",
          }}
        />
      </Skeleton>
    </HStack>
  );
};
