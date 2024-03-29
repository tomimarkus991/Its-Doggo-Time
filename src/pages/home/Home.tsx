import { Grid, GridItem, Box } from "@chakra-ui/react";

import { useAuth } from "context";

import { DefaultLayout, Header2, LoggedIn, LoggedOut } from "components";

export const Home = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <DefaultLayout>
          <LoggedIn />
        </DefaultLayout>
      ) : (
        <Grid
          templateColumns="1fr"
          templateRows={{ base: "0.5fr 1fr", sm: "0.3fr 1fr" }}
          templateAreas='"header" "main"'
          h="100vh"
        >
          <GridItem gridArea="header">
            <Header2 />
          </GridItem>
          <GridItem h="100%" gridArea="main">
            <Box h="100%">
              <LoggedOut />
            </Box>
          </GridItem>
        </Grid>
      )}
    </>
  );
};
