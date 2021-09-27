import { Box, Center, FlexProps, Flex } from '@chakra-ui/react';
import React from 'react';
import { Skeleton } from '../Skeleton';

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
    <Center id="7">
      <Flex h={mainH}>
        <Skeleton isLoading={isLoading} props={{ borderRadius: 20 }}>
          <Center
            {...containerProps}
            id="9"
            layerStyle="shadow-and-bg"
            position="relative"
            mb="1em"
            borderRadius={20}
          >
            {children}
            <Box
              position="absolute"
              right={{ base: '+50', md: '-10' }}
              bottom={{ base: '-10', md: '-10' }}
            >
              {button}
            </Box>
          </Center>
        </Skeleton>
      </Flex>
    </Center>
  );
};
export default MainContainerLayout;
