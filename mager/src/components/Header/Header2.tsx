import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

import { HeaderBackground, HeaderBackgroundSmall } from "../Icons";

export const Header2 = () => {
  return (
    <>
      <>
        <HeaderBackgroundSmall display={{ base: "block", sm: "none" }} />
        <HeaderBackground display={{ base: "none", sm: "block" }} />
      </>

      <Flex
        position="sticky"
        justifyContent="center"
        alignItems="center"
        minH={{ base: "14.5rem" }}
      >
        <Flex
          flex={1}
          maxW={{ base: 500, sm: 450, md: 700, lg: 900, xl: 1200 }}
          alignItems="center"
          justifyContent="center"
        >
          <RouterLink to="/">
            <Box id="header2Box" cursor="pointer">
              <Heading
                fontSize={{
                  base: "2.6rem",
                  sm: "3rem",
                  md: "6xl",
                  lg: "6xl",
                  xl: "6xl",
                }}
              >
                It&#39;s Doggo Time
              </Heading>
            </Box>
          </RouterLink>
          <Spacer display={{ base: "none", xl: "block" }} />
        </Flex>
      </Flex>
    </>
  );
};
