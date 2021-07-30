import { Flex } from '@chakra-ui/react';
import React from 'react';
import Skeleton from '../../Skeleton';

interface Props {
  button: any;
  isLoading: boolean;
}

const MainContainerLayout: React.FC<Props> = ({
  children,
  button,
  isLoading,
}) => {
  return (
    <Flex
      h="md"
      w="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Skeleton isLoading={isLoading} props={{ borderRadius: 20 }}>
        <Flex
          justifyContent="center"
          alignItems="center"
          h="sm"
          w="3xl"
          borderRadius={20}
          boxShadow="xl"
          px="2em"
          py="2em"
          overflow="hidden"
          mb="1em"
        >
          {children}
        </Flex>
      </Skeleton>
      <Flex w="3xl" justifyContent="flex-end">
        {button}
      </Flex>
    </Flex>
  );
};
export default MainContainerLayout;
