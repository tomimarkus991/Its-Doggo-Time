import { Box, Center, FlexProps } from '@chakra-ui/react';
import React from 'react';
import { Skeleton } from '../Skeleton';

interface Props {
  isLoading: boolean;
  button?: any;
  containerProps?: FlexProps;
}

const MainContainerLayout: React.FC<Props> = ({
  isLoading,
  children,
  button,
  containerProps,
}) => {
  return (
    <Center>
      <Center
        {...containerProps}
        id="9"
        layerStyle="shadow-and-bg"
        position="relative"
        borderRadius={20}
      >
        <Skeleton
          isLoading={isLoading}
          props={{ borderRadius: 20, h: '100%', w: '100%' }}
        >
          <Center h="100%">{children}</Center>
        </Skeleton>
        <Box
          position="absolute"
          right={{ base: '+50', md: '-10' }}
          bottom={{ base: '-10', md: '-10' }}
        >
          {button}
        </Box>
      </Center>
    </Center>
  );
};
export default MainContainerLayout;
