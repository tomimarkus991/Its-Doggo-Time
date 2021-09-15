import {
  Box,
  Flex,
  Heading,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
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
        <>
          <HeaderBackgroundDark
            h="100%"
            display={{ base: 'none', lg: 'block' }}
          />
        </>
      ) : (
        <>
          <HeaderBackgroundLight
            h="100%"
            display={{ base: 'none', lg: 'block' }}
          />
        </>
      )}
      <Flex position="sticky" justifyContent="center" alignItems="center">
        <Flex
          flex={1}
          maxW={{ base: 500, sm: 450, md: 700, lg: 900, xl: 1200 }}
          alignItems="center"
          flexDirection={{ base: 'column-reverse', sm: 'row' }}
        >
          <RouterLink to="/">
            <Box cursor="pointer">
              <Heading
                fontSize={{
                  base: '3xl',
                  sm: '4xl',
                  md: '5xl',
                  lg: '5xl',
                  xl: '6xl',
                }}
              >
                It&#39;s Doggo Time
              </Heading>
            </Box>
          </RouterLink>
          <Spacer />
          <DoggoIcon fontSize={{ base: '8rem', sm: '12rem' }} />
        </Flex>
      </Flex>
    </>
  );
};
export default Header;