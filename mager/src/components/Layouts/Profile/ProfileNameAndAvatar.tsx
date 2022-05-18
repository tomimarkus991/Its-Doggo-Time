import { Box, Center } from "@chakra-ui/react";

import { useUser } from "../../../hooks/queries";
import { AvatarProfile } from "../../Avatar";
import { Name } from "../../Headers";
import { Skeleton } from "../../Skeleton";

interface Props {
  isUsernameLoading?: boolean;
  isUserAvatarLoading?: boolean;
}

const ProfileNameAndAvatar: React.FC<Props> = ({ isUsernameLoading, isUserAvatarLoading }) => {
  const { data, isLoading } = useUser();

  return (
    <Center flexDirection={{ sm: "row", lg: "column" }}>
      <Skeleton isLoading={isLoading || isUserAvatarLoading} props={{ mb: { sm: "0", lg: "4" } }}>
        <Box mr={{ sm: "6", lg: "0" }}>
          <AvatarProfile src={data?.avatar_url} />
        </Box>
      </Skeleton>
      <Skeleton isLoading={isLoading || isUsernameLoading}>
        <Name
          name={String(data?.username)}
          textProps={{
            fontSize: { sm: "4xl", md: "5xl" },
          }}
        />
      </Skeleton>
    </Center>
  );
};

export default ProfileNameAndAvatar;
