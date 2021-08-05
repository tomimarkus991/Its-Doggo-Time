import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  leftSide: any;
  middle: any;
  rightSide: any;
}

export const MainLayout2: React.FC<Props> = ({
  leftSide,
  middle,
  rightSide,
}) => {
  return (
    <Grid
      templateRows={{
        base: '1fr 0.1fr',
        lg: '1fr',
      }}
      templateColumns={{ base: '1fr 1fr', lg: '1fr 2fr 1fr' }}
      templateAreas={{
        base: '"middle middle" "rightSide rightSide" ',
        lg: '"leftSide middle rightSide"',
      }}
      h="100%"
      w="100%"
      id="3"
    >
      <GridItem
        id="42"
        display={{ base: 'none', sm: 'block' }}
        gridArea="leftSide"
      >
        <VStack
          h="100%"
          alignItems={{
            sm: 'flex-start',
            lg: 'center',
            '2xl': 'flex-end',
          }}
        >
          <VStack w="100%" h="100%">
            {leftSide}
          </VStack>
        </VStack>
      </GridItem>
      <GridItem position="sticky" id="4" gridArea="middle">
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
