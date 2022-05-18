import { Box, HStack } from "@chakra-ui/react";

import { useUser } from "hooks/queries";
import { AvatarProfile } from "Avatar";
import { Name } from "Headers";
import { Skeleton } from "Skeleton";

interface Props {
  isUsernameLoading?: boolean;
  isUserAvatarLoading?: boolean;
}

const ProfileNameAndAvatarMiddle: React.FC<Props> = ({
  isUsernameLoading,
  isUserAvatarLoading,
}) => {
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

export default ProfileNameAndAvatarMiddle;
