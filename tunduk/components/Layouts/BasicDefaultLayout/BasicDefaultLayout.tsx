import { Box, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import React from 'react';
import Header from '../../Header';
import { HeaderBackgroundDark } from '../../Icons/DarkMode';
import {
  SmallHeaderBgLight,
  HeaderBackgroundLight,
} from '../../Icons/LightMode';

const BasicDefaultLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { colorMode } = useColorMode();
  return (
    <Grid
      templateColumns="1fr"
      templateRows="0.4fr 1fr"
      templateAreas='"header" "main"'
      h="100vh"
    >
      {colorMode === 'dark' ? (
        <>
          <HeaderBackgroundDark display={{ base: 'block', sm: 'none' }} />
        </>
      ) : (
        <>
          <SmallHeaderBgLight display={{ base: 'block', sm: 'none' }} />
          <HeaderBackgroundLight
            h="100%"
            display={{ base: 'none', sm: 'block', lg: 'none' }}
          />
        </>
      )}
      <GridItem gridArea="header">
        <Header />
      </GridItem>
      <GridItem gridArea="main">
        <Box h="100%">{children}</Box>
      </GridItem>
    </Grid>
  );
};
export default BasicDefaultLayout;
