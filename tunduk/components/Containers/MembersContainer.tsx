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
  isLoading: boolean;
  AddNewMember: any;
}

export const MembersContainer: React.FC<Props> = ({
  members,
  isEditable,
  group_id,
  creator_id,
  isLoading,
  AddNewMember,
}) => {
  const [paws, setPaws] = useState<string[]>();

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
      mainH="sm"
      isLoading={isLoading}
      button={AddNewMember}
      containerProps={{
        w: {
          base: 'xs',
          sm: 'md',
          md: 'md',
          lg: 'lg',
          xl: 'xl',
        },
        h: { base: 'md', sm: 'sm' },
      }}
    >
      <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={10}>
        {members?.map((member: ProfileType, index: number) => (
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
            <DogPawn
              fontSize={{
                base: '5rem',
                md: '6rem',
                lg: '6.5rem',
                xl: '7rem',
              }}
            />
          </Box>
        ))}
      </SimpleGrid>
    </MainContainerLayout>
  );
};
