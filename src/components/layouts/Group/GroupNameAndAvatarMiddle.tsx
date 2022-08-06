import { Box, HStack } from "@chakra-ui/react";

import { Skeleton, Name, AvatarGroup } from "components";

import { useFetchGroupData } from "hooks";

interface Props {
  group_id: string;
  isGroupnameLoading?: boolean;
  isGroupPictureLoading?: boolean;
}

export const GroupNameAndAvatarMiddle = ({
  group_id,
  isGroupnameLoading,
  isGroupPictureLoading,
}: Props) => {
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
