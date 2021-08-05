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
    <VStack id="7" h={mainH}>
      <Skeleton isLoading={isLoading} props={{ borderRadius: 20 }}>
        <Flex
          {...containerProps}
          style={{ boxShadow: '1px 1px 8px 2px #DDCDBF' }}
          bg="white"
          position="relative"
          justifyContent="center"
          alignItems="center"
          borderRadius={20}
          mb="1em"
          id="9"
        >
          {children}
          <Box
            position="absolute"
            right={{ base: '+50', lg: '-10' }}
            bottom={{ base: '-10', lg: '-10' }}
          >
            {button}
          </Box>
        </Flex>
      </Skeleton>
    </VStack>
  );
};
export default MainContainerLayout;
