import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  leftSide: any;
  middle: any;
  rightSide: any;
}

const MainLayout: React.FC<Props> = ({ leftSide, middle, rightSide }) => {
  return (
    <Grid
      templateRows={{
        base: '1fr 0.1fr',
        sm: '0.4fr 1fr 0.2fr',
        lg: '1fr',
      }}
      templateColumns={{ base: '1fr 1fr', lg: '1fr 2fr 1fr' }}
      templateAreas={{
        base: '"middle middle" "rightSide rightSide" ',
        sm: '"leftSide leftSide" "middle middle" "rightSide rightSide" ',
        lg: '"leftSide middle rightSide"',
      }}
      h="100%"
      w="100%"
      id="3"
    >
      <VStack
        id="leftSide"
        gridArea="leftSide"
        h="100%"
        alignItems={{
          sm: 'flex-start',
          lg: 'flex-end',
        }}
        display={{ base: 'none', sm: 'flex' }}
      >
        {leftSide}
      </VStack>

      <GridItem id="middle" gridArea="middle">
        {middle}
      </GridItem>
      <HStack
        id="rightSide"
        gridArea="rightSide"
        py={{ base: '4', lg: '0' }}
        h={{ base: '100%', lg: 'fit-content' }}
        alignItems="flex-end"
        spacing="6"
        justifyContent={{ base: 'space-evenly', lg: 'normal' }}
        // position={{ base: 'fixed', lg: 'unset' }}
        // bgColor="white"
        // bottom={{ base: 0, lg: 'unset' }}
        // zIndex={20}
      >
        {rightSide}
      </HStack>
    </Grid>
  );
};
export default MainLayout;
