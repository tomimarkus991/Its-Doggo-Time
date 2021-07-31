import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import MainContainerLayout from '../Layouts/Containers';
import { AddDutyLink } from '../Links';

interface Props {}

export const ChatsContainer: React.FC<Props> = ({}) => {
  return (
    <MainContainerLayout button={<AddDutyLink />} isLoading={false}>
      {true ? (
        <SimpleGrid
          w="100%"
          h="100%"
          columns={2}
          spacing={10}
          overflowY="scroll"
        >
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
          <Box h="80px" bg="orange" />
        </SimpleGrid>
      ) : (
        <Text>Chat is Empty</Text>
      )}
    </MainContainerLayout>
  );
};
