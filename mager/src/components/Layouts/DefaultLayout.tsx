import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header';
import { HeaderBackground, HeaderBackgroundSmall } from '../Icons';

const DefaultLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Grid
      id="default grid"
      templateColumns="1fr"
      templateRows={{ base: '1fr', lg: '0.4fr 1fr' }}
      templateAreas={{ base: '"main"', lg: '"header" "main"' }}
      h="100vh"
    >
      <>
        <HeaderBackgroundSmall display={{ base: 'block', sm: 'none' }} />
        <HeaderBackground
          h="100%"
          display={{ base: 'none', sm: 'block', lg: 'none' }}
        />
      </>

      <GridItem
        display={{ base: 'none', lg: 'initial' }}
        gridArea="header"
      >
        <Header />
      </GridItem>
      <GridItem zIndex={2} id="1" gridArea="main" h="100%">
        <Box zIndex={2} id="2" h="100%">
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
};
export default DefaultLayout;
