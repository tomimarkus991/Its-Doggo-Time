import { Avatar as ChakraAvatar, Box, BoxProps } from "@chakra-ui/react";

import { useColors, useFetchAvatar } from "hooks";

import { Skeleton } from "components";

import { AvatarIconType } from "types";

interface Props {
  path: string | undefined;
  w: any;
  h: any;
  icon: AvatarIconType;
  textProps?: BoxProps;
  type: "Group" | "User";
}

export const Avatar = ({ path, w, h, icon, textProps, type }: Props) => {
  const { defaultColor } = useColors();

  const { data, isLoading, isSuccess } = useFetchAvatar(
    path,
    type === "User" ? ["userAvatar", path] || "userAvatar" : ["groupAvatar", path] || "groupAvatar"
  );

  return (
    <Skeleton isLoading={isLoading}>
      <Box id="avatar" {...textProps}>
        {isSuccess && data ? (
          <ChakraAvatar w={w} h={h} src={data} icon={<Box></Box>} bgColor={defaultColor} />
        ) : (
          <ChakraAvatar icon={icon} w={w} h={h} bgGradient="linear(to-r, beez.100, beez.700)" />
        )}
      </Box>
    </Skeleton>
  );
};
