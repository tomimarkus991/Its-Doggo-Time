import { Box, HStack } from "@chakra-ui/react";

import { Skeleton, Name, AvatarGroup } from "components";
import { useFetchGroupData } from "hooks/queries";

interface Props {
  group_id: string;
  isGroupnameLoading?: boolean;
  isGroupPictureLoading?: boolean;
}

const GroupNameAndAvatarMiddle: React.FC<Props> = ({
  group_id,
  isGroupnameLoading,
  isGroupPictureLoading,
}) => {
  const { data, isLoading } = useFetchGroupData(group_id);

  return (
    <HStack display={{ base: "flex", sm: "none" }}>
      <Skeleton isLoading={isLoading || isGroupPictureLoading}>
        <Box mr={2}>
          <AvatarGroup src={data?.avatar_url} />
        </Box>
      </Skeleton>
      <Skeleton isLoading={isLoading || isGroupnameLoading}>
        <Name
          name={String(data?.group_name)}
          textProps={{
            fontSize: "4xl",
          }}
        />
      </Skeleton>
    </HStack>
  );
};

export default GroupNameAndAvatarMiddle;
