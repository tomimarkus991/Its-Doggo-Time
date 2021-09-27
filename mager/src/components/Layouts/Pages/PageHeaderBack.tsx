import { Center, Grid, Heading } from '@chakra-ui/react';
import React from 'react';
import { BackIcon } from '../../Icons';

const PageHeaderBack: React.FC = ({ children }) => {
  return (
    <Center>
      <Grid
        flex={1}
        templateColumns="0.1fr 1fr"
        justifyContent="center"
        alignItems="center"
      >
        <BackIcon />
        <Heading fontSize="4xl" textAlign="center">
          {children}
        </Heading>
      </Grid>
    </Center>
  );
};
export default PageHeaderBack;
