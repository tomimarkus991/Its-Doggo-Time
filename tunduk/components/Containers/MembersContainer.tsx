import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ProfileType, StringOrUndefined } from '../../types';
import { MemberCard } from '../Cards';
import { DogPawn } from '../Icons/LightMode';
import MainContainerLayout from '../Layouts/Containers';

interface Props {
  members: ProfileType[] | undefined;
  isEditable: boolean;
  group_id: StringOrUndefined;
  creator_id: StringOrUndefined;
  AddNewMember: any;
}

export const MembersContainer: React.FC<Props> = ({
  members,
  isEditable,
  group_id,
  creator_id,
  AddNewMember,
}) => {
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
    <MainContainerLayout
      button={AddNewMember}
      isLoading={false}
      containerProps={{ w: '2xl', h: 'sm' }}
    >
      {members ? (
        <SimpleGrid columns={3} spacing={10}>
          {members.map((member: ProfileType, index: number) => (
            <Box key={index}>
              <MemberCard
                member={member}
                isEditable={isEditable}
                group_id={group_id}
                creator_id={creator_id}
              />
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
    </MainContainerLayout>
  );
};
