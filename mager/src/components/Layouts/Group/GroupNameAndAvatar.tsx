import { Box, Center } from "@chakra-ui/react";

import { useFetchGroupData } from "../../../hooks/queries";
import { AvatarGroup } from "../../Avatar";
import { Name } from "../../Headers";
import { Skeleton } from "../../Skeleton";

interface Props {
  group_id: string;
  isGroupnameLoading?: boolean;
  isGroupPictureLoading?: boolean;
}

const GroupNameAndAvatar: React.FC<Props> = ({
  group_id,
  isGroupnameLoading,
  isGroupPictureLoading,
}) => {
  const { data, isLoading } = useFetchGroupData(group_id);

  return (
    <Center flexDirection={{ sm: "row", lg: "column" }}>
      <Skeleton isLoading={isLoading || isGroupPictureLoading} props={{ mb: { sm: "0", lg: "4" } }}>
        <Box mr={{ sm: "6", lg: "0" }}>
          <AvatarGroup src={data?.avatar_url} />
        </Box>
      </Skeleton>
      <Skeleton isLoading={isLoading || isGroupnameLoading}>
        <Name
          name={String(data?.group_name)}
          textProps={{
            fontSize: { sm: "4xl", md: "5xl" },
          }}
        />
      </Skeleton>
    </Center>
  );
};

export default GroupNameAndAvatar;
