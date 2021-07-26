import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {}

export const Chats: React.FC<Props> = ({}) => {
  return (
    <Box
      boxShadow="lg"
      h="xs"
      w="xl"
      borderRadius={20}
      boxSizing="border-box"
      p="20px"
    >
      <Box id="2" mb={4}>
        <Text>OVERVIEW</Text>
      </Box>
      <Box id="group" m="auto" h="81%" overflow="scroll">
        {true ? (
          <Box>
            <SimpleGrid columns={2} spacing={10}>
              <Box h="80px" bg="orange" />
              <Box h="80px" bg="orange" />
              <Box h="80px" bg="orange" />
              <Box h="80px" bg="orange" />
              <Box h="80px" bg="orange" />
              <Box h="80px" bg="orange" />
            </SimpleGrid>
          </Box>
        ) : (
          <Text>You have no groups</Text>
        )}
      </Box>
    </Box>
  );
};

// {groupMembers ? (
//   <>
//     {groupMembers.map((member: any, index: number) => {
//       return (
//         <Box key={index}>
//           <Avatar src={member.avatar_url} size="2xl" />
//           <Text>{member.username}</Text>
//         </Box>
//       );
//     })}
//   </>
// ) : null}
