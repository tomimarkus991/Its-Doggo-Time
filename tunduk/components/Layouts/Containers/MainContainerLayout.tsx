import { Box, Flex, FlexProps, VStack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  button?: any;
  containerProps?: FlexProps;
}

const MainContainerLayout: React.FC<Props> = ({
  children,
  button,
  containerProps,
}) => {
  return (
    <VStack h="md">
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
        <Box position="absolute" right="-10" bottom="-10">
          {button}
        </Box>
      </Flex>
    </VStack>
  );
};
export default MainContainerLayout;
