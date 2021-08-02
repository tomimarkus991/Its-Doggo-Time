import { Grid, GridItem, Box } from '@chakra-ui/react';
import React from 'react';
import { Header2 } from '../../components/Header';
import DefaultLayout from '../../components/Layouts/Default';
import LoggedIn from '../../components/LoggedIn';
import LoggedOut from '../../components/LoggedOut';
import { useAuth } from '../../context/authContext/AuthContext';

const Home: React.FC = () => {
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
          templateRows="0.4fr 1fr"
          templateAreas='"header" "main"'
          h="100vh"
        >
          <GridItem gridArea="header">
            <Header2 />
          </GridItem>
          <GridItem gridArea="main">
            <Box h="100%">
              <LoggedOut />
            </Box>
          </GridItem>
        </Grid>
      )}
    </>
  );
};
export default Home;
