import { Box, Center, FlexProps } from "@chakra-ui/react";

import { ReactNode } from "react";

import { Skeleton } from "../Skeleton";

interface Props {
  isLoading: boolean;
  button?: any;
  containerProps?: FlexProps;
  children: ReactNode;
}

export const MainContainerLayout = ({ isLoading, children, button, containerProps }: Props) => {
  return (
    <Center>
      <Center
        {...containerProps}
        id="9"
        layerStyle="shadow-and-bg"
        position="relative"
        borderRadius={20}
      >
        <Skeleton isLoading={isLoading} props={{ borderRadius: 20, h: "100%", w: "100%" }}>
          <Center h="100%">{children}</Center>
        </Skeleton>
        <Box
          position="absolute"
          right={{ base: "+50", md: "-10" }}
          bottom={{ base: "-10", md: "-10" }}
        >
          {button}
        </Box>
      </Center>
    </Center>
  );
};
