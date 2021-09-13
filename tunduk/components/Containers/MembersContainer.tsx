import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import useMembersPlaceholder from '../../hooks/placeholders/useMembersPlaceholder';
import { ProfileType, StringOrUndefined } from '../../types';
import { MemberCard } from '../Cards';
import { ProfileIcon } from '../Icons/Navbar';
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
  const { placeholders } = useMembersPlaceholder(members);

  return (
    <MainContainerLayout
      mainH="sm"
      isLoading={isLoading}
      button={AddNewMember}
      containerProps={{
        w: {
          base: 'xs',
          sm: 'md',
          sm2: 'lg',
          md: 'xl',
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
        {placeholders?.map((_, index: number) => (
          <Box key={index}>
            <ProfileIcon
              fontSize={{
                base: '5rem',
                md: '6rem',
                lg: '6rem',
                xl: '6.5rem',
              }}
            />
          </Box>
        ))}
      </SimpleGrid>
    </MainContainerLayout>
  );
};
