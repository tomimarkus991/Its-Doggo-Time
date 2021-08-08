import { Box, Flex, FlexProps, VStack } from '@chakra-ui/react';
import React from 'react';
import Skeleton from '../../Skeleton';

interface Props {
  mainH: any;
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
          layerStyle="shadow-and-bg"
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
            right={{ base: '+50', md: '-10' }}
            bottom={{ base: '-10', md: '-10' }}
          >
            {button}
          </Box>
        </Flex>
      </Skeleton>
    </VStack>
  );
};
export default MainContainerLayout;
