import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GroupType } from '../../types';
import { GroupCard } from '../Cards';
import { DogPawn } from '../Icons/LightMode';
import MainContainer from '../Layouts/MainContainer';
import { NewDoggoGroupLink } from '../Links';

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
    <MainContainer button={<NewDoggoGroupLink />}>
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
    </MainContainer>
  );
};
