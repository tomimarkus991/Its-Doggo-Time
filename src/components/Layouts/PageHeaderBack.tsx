import { Center, Grid, Heading } from "@chakra-ui/react";

import { BackIcon } from "../Icons";

export const PageHeaderBack = ({ children }) => {
  return (
    <Center py="4">
      <Grid flex={1} templateColumns="0.1fr 1fr" justifyContent="center" alignItems="center">
        <BackIcon />
        <Heading fontSize="4xl" textAlign="center">
          {children}
        </Heading>
      </Grid>
    </Center>
  );
};
