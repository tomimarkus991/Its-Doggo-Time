import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Header from '../../Header';

const BasicDefaultLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Grid
      templateColumns="1fr"
      templateRows="0.4fr 1fr"
      templateAreas='"header" "main"'
      h="100vh"
    >
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
