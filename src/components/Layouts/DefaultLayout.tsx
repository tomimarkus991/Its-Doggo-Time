import { Box, Grid, GridItem } from "@chakra-ui/react";

import Header from "../Header";
import { HeaderBackground, HeaderBackgroundSmall } from "../Icons";

export const DefaultLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Grid
      id="default grid"
      templateColumns="1fr"
      templateRows={{ base: "1fr", lg: "0.4fr 1fr" }}
      templateAreas={{ base: '"main"', lg: '"header" "main"' }}
      h="100vh"
    >
      <HeaderBackgroundSmall display={{ base: "block", sm: "none" }} />
      <HeaderBackground h="100%" display={{ base: "none", sm: "block", lg: "none" }} />

      <GridItem gridArea="header" display={{ base: "none", lg: "initial" }}>
        <Header />
      </GridItem>
      <GridItem id="1" gridArea="main" zIndex={2} h="100%">
        <Box zIndex={2} id="2" h="100%">
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
};
