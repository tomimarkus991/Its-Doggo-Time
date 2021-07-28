import { Box, Flex, HStack, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Heading } from '../Headers';

interface Props {
  name: any;
  Avatar: any;
  headingTitle: string;
}

export const TopMainBar: React.FC<Props> = ({
  name,
  Avatar,
  headingTitle,
  children,
}) => {
  return (
    <HStack>
      <Flex alignItems="center">
        <Box>{Avatar}</Box>
        <Box>{name}</Box>
      </Flex>
      <Spacer />
      <Heading title={headingTitle} />
      <Spacer />
      <HStack
        aria-label="navbar links"
        alignItems="flex-start"
        spacing="6"
      >
        {children}
      </HStack>
    </HStack>
  );
};
