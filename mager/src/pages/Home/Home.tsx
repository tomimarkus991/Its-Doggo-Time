import { Grid, GridItem, Box } from '@chakra-ui/react';
import React from 'react';
import { Header2 } from '../../components/Header';
import { DefaultLayout } from '../../components/Layouts';
import { LoggedIn } from '../../components/Home';
import { LoggedOut } from '../../components/Home';
import { useAuth } from '../../context';

const Home: React.FC = () => {
  const { user } = useAuth();
  // console.log('home user', user);

  return (
    <>
      {user ? (
        <DefaultLayout>
          <LoggedIn />
        </DefaultLayout>
      ) : (
        <Grid
          templateColumns="1fr"
          templateRows={{ base: '0.5fr 1fr', sm: '0.3fr 1fr' }}
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
export default Home;
