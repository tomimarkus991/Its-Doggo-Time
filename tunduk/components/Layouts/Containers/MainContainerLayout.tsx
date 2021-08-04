import { Box, Flex, FlexProps, VStack } from '@chakra-ui/react';
import React from 'react';
import Skeleton from '../../Skeleton';

interface Props {
  mainH: string;
  isLoading: boolean;
  button?: any;
  containerProps?: FlexProps;
}

const MainContainerLayout: React.FC<Props> = ({
  mainH,
  isLoading,
  children,
  button,
  containerProps,
}) => {
  return (
    <VStack h={mainH}>
      <Skeleton isLoading={isLoading} props={{ borderRadius: 20 }}>
        <Flex
          {...containerProps}
          style={{ boxShadow: '1px 1px 8px 2px #DDCDBF' }}
          position="relative"
          justifyContent="center"
          alignItems="center"
          borderRadius={20}
          mb="1em"
        >
          {children}
          <Box
            position="absolute"
            right={{ base: '0', lg: '-10' }}
            bottom={{ base: '0', lg: '-10' }}
          >
            {button}
          </Box>
        </Flex>
      </Skeleton>
    </VStack>
  );
};
export default MainContainerLayout;
