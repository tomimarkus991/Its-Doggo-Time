import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';

interface Props {
  leftSide: any;
  middle: any;
  rightSide: any;
}

const MainLayout: React.FC<Props> = ({ leftSide, middle, rightSide }) => {
  return (
    <Grid
      templateRows="1fr"
      templateColumns="1fr 2fr 1fr"
      templateAreas='"leftSide middle rightSide"'
      h="100%"
      w="100%"
    >
      <GridItem gridArea="leftSide">
        <VStack alignItems={{ xl: 'flex-end' }}>
          <VStack>{leftSide}</VStack>
        </VStack>
      </GridItem>
      <GridItem gridArea="middle">{middle}</GridItem>
      <GridItem gridArea="rightSide">
        <HStack spacing="6">{rightSide}</HStack>
      </GridItem>
    </Grid>
  );
};
export default MainLayout;
