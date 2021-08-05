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
        display={{ base: 'none', sm: 'flex' }}
        gridArea="leftSide"
        h="100%"
        alignItems={{
          sm: 'flex-start',
          md: 'center',
          lg: 'flex-end',
        }}
      >
        {leftSide}
      </VStack>

      <GridItem id="middle" gridArea="middle">
        {middle}
      </GridItem>
      <GridItem gridArea="rightSide">
        <HStack
          h={{ base: '80%', lg: 'fit-content' }}
          spacing="6"
          alignItems={{ base: 'flex-end' }}
          justifyContent={{ base: 'space-evenly', lg: 'normal' }}
        >
          {rightSide}
        </HStack>
      </GridItem>
    </Grid>
  );
};
export default MainLayout;
