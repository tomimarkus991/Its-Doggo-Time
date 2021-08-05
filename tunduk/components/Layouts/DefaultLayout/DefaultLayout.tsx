import { Box, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import React from 'react';
import Header from '../../Header';
import { HeaderBackgroundDark } from '../../Icons/DarkMode';
import {
  HeaderBackgroundLight,
  SmallHeaderBgLight,
} from '../../Icons/LightMode';

const DefaultLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { colorMode } = useColorMode();
  return (
    <Grid
      templateColumns="1fr"
      templateRows={{ base: '1fr', lg: '0.4fr 1fr' }}
      templateAreas={{ base: '"main"', lg: '"header" "main"' }}
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
      <GridItem
        display={{ base: 'none', lg: 'initial' }}
        gridArea="header"
      >
        <Header />
      </GridItem>
      <GridItem zIndex={2} id="1" gridArea="main ">
        <Box zIndex={2} id="2" h="100%">
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
};
export default DefaultLayout;
