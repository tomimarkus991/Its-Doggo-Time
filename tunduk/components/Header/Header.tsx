import { Box, Flex, Spacer, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HeaderBackgroundDark } from '../Icons/DarkMode';
import { DoggoIcon } from '../Icons/Doggo';
import { HeaderBackgroundLight } from '../Icons/LightMode';
const Header: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      {colorMode === 'dark' ? (
        <HeaderBackgroundDark />
      ) : (
        <HeaderBackgroundLight />
      )}

      <Flex zIndex={1} position="sticky" justifyContent="center">
        <Flex flex={1} maxW={1200} alignItems="center">
          <RouterLink to="/">
            <Box cursor="pointer">
              <Text fontSize={70}>It&#39;s Doggo Time</Text>
            </Box>
          </RouterLink>
          <Spacer />
          <DoggoIcon width="48" h="48" />
        </Flex>
      </Flex>
    </>
  );
};
export default Header;
