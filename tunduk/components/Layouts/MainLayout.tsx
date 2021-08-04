import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';

interface Props {
  leftSide: any;
  middle: any;
  rightSide: any;
}

const MainLayout: React.FC<Props> = ({ leftSide, middle, rightSide }) => {
  return (
    <Grid
      templateRows={{ base: '"1fr" "1fr" "0.1fr"', lg: '1fr' }}
      templateColumns={{ base: '1fr 1fr', lg: '1fr 2fr 1fr' }}
      templateAreas={{
        base: '"leftSide leftSide" "middle middle" "rightSide rightSide" ',
        lg: '"leftSide middle rightSide"',
      }}
      h="100%"
      w="100%"
    >
      <GridItem gridArea="leftSide">
        <VStack
          h="100%"
          alignItems={{
            base: 'flex-start',
            lg: 'center',
            '2xl': 'flex-end',
          }}
        >
          <VStack h="100%">{leftSide}</VStack>
        </VStack>
      </GridItem>
      <GridItem gridArea="middle">{middle}</GridItem>
      <GridItem gridArea="rightSide">
        <HStack
          spacing="6"
          alignItems={{ base: 'center', lg: 'flex-end' }}
          justifyContent={{ base: 'center', lg: 'normal' }}
        >
          {rightSide}
        </HStack>
      </GridItem>
    </Grid>
  );
};
export default MainLayout;
