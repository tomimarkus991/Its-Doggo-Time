import { Box, Flex, Spacer, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HeaderBackgroundDark } from '../Icons/DarkMode';
import { HeaderBackgroundLight } from '../Icons/LightMode';
export const Header2: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      {colorMode === 'dark' ? (
        <HeaderBackgroundDark />
      ) : (
        <HeaderBackgroundLight />
      )}

      <Flex
        zIndex={1}
        position="sticky"
        justifyContent="center"
        alignItems="center"
        minH="192px"
      >
        <Flex
          flex={1}
          maxW={1200}
          alignItems="center"
          justifyContent="center"
        >
          <RouterLink to="/">
            <Box cursor="pointer">
              <Text fontSize={70}>It&#39;s Doggo Time</Text>
            </Box>
          </RouterLink>
          <Spacer />
        </Flex>
      </Flex>
    </>
  );
};
