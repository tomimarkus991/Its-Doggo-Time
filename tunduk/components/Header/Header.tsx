import {
  Box,
  color,
  Flex,
  Spacer,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { NavbarBackgroundDark } from '../Icons/DarkMode';
import { DoggoIcon } from '../Icons/Doggo';
import { NavbarBackgroundLight } from '../Icons/LightMode';
const Header: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      {colorMode === 'dark' ? (
        <NavbarBackgroundDark />
      ) : (
        <NavbarBackgroundLight />
      )}

      <Flex zIndex={1} position="sticky" justifyContent="center" py={4}>
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
    </Box>
  );
};
export default Header;
