import { Box, Flex, Spacer, useColorMode } from '@chakra-ui/react';
import { NavbarBackgroundDark } from '../Icons/DarkMode';
import { NavbarBackgroundLight } from '../Icons/LightMode';
import { LeftNavbar } from './LeftNavbar';
import { RightNavbar } from './RightNavbar';

const Navbar: React.FC = () => {
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
          <LeftNavbar />
          <Spacer />
          <RightNavbar />
        </Flex>
      </Flex>
    </Box>
  );
};
export default Navbar;
