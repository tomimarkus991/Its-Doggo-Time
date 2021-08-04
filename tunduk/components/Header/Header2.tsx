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
import {
  HeaderBackgroundLight,
  SmallHeaderBgLight,
} from '../Icons/LightMode';
export const Header2: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      {colorMode === 'dark' ? (
        <>
          <HeaderBackgroundDark display={{ base: 'none', sm: 'block' }} />
        </>
      ) : (
        <>
          <HeaderBackgroundLight display={{ base: 'none', sm: 'block' }} />
          <SmallHeaderBgLight display={{ base: 'block', sm: 'none' }} />
        </>
      )}

      <Flex
        zIndex={1}
        position="sticky"
        justifyContent="center"
        alignItems="center"
        minH={{ base: '14.5rem' }}
      >
        <Flex
          flex={1}
          maxW={{ base: 500, sm: 450, md: 700, lg: 900, xl: 1200 }}
          alignItems="center"
          justifyContent="center"
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
          <Spacer display={{ base: 'none', sm: 'block' }} />
        </Flex>
      </Flex>
    </>
  );
};
