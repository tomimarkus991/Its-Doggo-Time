import { Flex, VStack } from '@chakra-ui/react';
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
    <VStack h="md">
      <Skeleton isLoading={isLoading} props={{ borderRadius: 20 }}>
        <Flex
          justifyContent="center"
          alignItems="center"
          h="sm"
          w="2xl"
          borderRadius={20}
          boxShadow="xl"
          overflow="hidden"
          mb="1em"
        >
          {children}
        </Flex>
      </Skeleton>
      <Flex w="2xl" justifyContent="flex-end">
        {button}
      </Flex>
    </VStack>
  );
};
export default MainContainerLayout;
