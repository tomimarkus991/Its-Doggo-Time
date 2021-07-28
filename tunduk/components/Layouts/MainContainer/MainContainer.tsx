import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
  button: any;
}

const MainContainer: React.FC<Props> = ({ children, button }) => {
  return (
    <Flex
      h="md"
      w="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        h="sm"
        w="3xl"
        borderRadius={20}
        boxShadow="lg"
        px="2em"
        py="2em"
        overflow="hidden"
        mb="1em"
      >
        {children}
      </Flex>
      <Flex w="3xl" justifyContent="flex-end">
        {button}
      </Flex>
    </Flex>
  );
};
export default MainContainer;
