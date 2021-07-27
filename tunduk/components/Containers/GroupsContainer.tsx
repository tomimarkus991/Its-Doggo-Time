import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GroupType } from '../../types';
import { GroupCard } from '../Cards';
import { DogPawn } from '../Icons/LightMode';

interface Props {
  userGroups: GroupType[] | undefined;
}

export const GroupsContainer: React.FC<Props> = ({ userGroups }) => {
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
      if (!userGroups) return;
      const _paws = max - userGroups.length;

      let dogPawns: string[] = [];

      for (let i = 1; i <= _paws; i++) {
        dogPawns.push('paw');
      }
      setPaws(dogPawns);
    };
    getPaws();
  }, [userGroups]);

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
        {userGroups ? (
          <SimpleGrid columns={3} spacing={10}>
            {userGroups.map((group: GroupType, index: number) => (
              <Box key={index}>
                <GroupCard group={group} />
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
