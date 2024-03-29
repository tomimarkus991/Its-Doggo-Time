import { Box, Grid, GridItem } from "@chakra-ui/react";

import { HeaderBackgroundSmall, HeaderBackground, Header } from "components";

export const BasicDefaultLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Grid
      id="default grid"
      templateColumns="1fr"
      templateRows="0.4fr 1fr"
      templateAreas='"header" "main"'
      h="100vh"
    >
      <HeaderBackgroundSmall display={{ base: "block", sm: "none" }} />
      <HeaderBackground h="100%" display={{ base: "none", sm: "block", lg: "none" }} />

      <GridItem gridArea="header">
        <Header />
      </GridItem>
      <GridItem gridArea="main">
        <Box h="100%">{children}</Box>
      </GridItem>
    </Grid>
  );
};
