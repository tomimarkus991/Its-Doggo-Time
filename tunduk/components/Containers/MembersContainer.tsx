import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { GroupType, ProfileType } from '../../types';
import { GroupCard, MemberCard } from '../Cards';
import { DogPawn } from '../Icons/LightMode';

interface Props {
  members: ProfileType[];
}

export const MembersContainer: React.FC<Props> = ({ members }) => {
  const [paws, setPaws] = useState<string[]>();
  const [defaultPaws] = useState<string[]>([
    'paw',
    'paw',
    'paw',
    'paw',
    'paw',
    'paw',
  ]);
  useEffect(() => {
    let getPaws = () => {
      let max = 6;
      if (!members) return;
      const _paws = max - members.length;

      let dogPawns: string[] = [];

      for (let i = 1; i <= _paws; i++) {
        dogPawns.push('paw');
      }
      setPaws(dogPawns);
    };
    getPaws();
  }, [members]);

  return (
    <Flex
      boxShadow="lg"
      h="sm"
      w="3xl"
      borderRadius={20}
      boxSizing="border-box"
      px="1.5em"
      alignItems="center"
      justifyContent="center"
      mb="1em"
      overflow="hidden"
    >
      <Flex justifyContent="center" alignItems="center" overflow="hidden">
        {members ? (
          <SimpleGrid columns={3} spacing={10}>
            {members.map((member: ProfileType, index: number) => (
              <Box key={index}>
                <MemberCard member={member} />
              </Box>
            ))}
            {paws?.map((_, index: number) => (
              <Box key={index}>
                <DogPawn width="116" height="100" />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={3} spacing={10}>
            {defaultPaws?.map((_, index: number) => (
              <Box key={index}>
                <DogPawn width="116" height="100" />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Flex>
  );
};
