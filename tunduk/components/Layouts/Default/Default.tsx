import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../../Navbar';

const Default = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Grid
      templateColumns="1fr"
      templateRows="0.4fr 1fr"
      templateAreas='"nav" "main"'
      h="100vh"
    >
      <GridItem gridArea="nav">
        <Navbar />
      </GridItem>
      <GridItem gridArea="main">
        <Grid
          templateColumns="1fr"
          templateRows="1fr"
          templateAreas='"main-content"'
          h="100%"
        >
          <GridItem gridArea="main-content">
            <Box h="100%">{children}</Box>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};
export default Default;
