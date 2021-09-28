import { Box, IconButton, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useAuth, useGroup } from '../../context';
import { useMembersPlaceholder } from '../../hooks/placeholders';
import { MemberType, StringOrUndefined } from '../../types';
import { PenButton } from '../Buttons';
import { MemberCard } from '../Cards';
import { CheckIcon, ProfileIcon } from '../Icons';
import { MainContainerLayout } from '../Layouts';

interface Props {
  group_id: StringOrUndefined;
  isLoading: boolean;
  AddNewMember: any;
}

const MembersContainer: React.FC<Props> = ({
  group_id,
  isLoading,
  AddNewMember,
}) => {
  const { user } = useAuth();
  const { members, creator_id } = useGroup();
  const { placeholders } = useMembersPlaceholder(members);
  const [isEditable, setIsEditable] = useState(false);

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
          md: 'lg',
          lg: 'xl',
        },
        h: { base: 'md', sm: 'sm', md: 'sm' },
      }}
    >
      <SimpleGrid
        columns={{ base: 2, sm: 3 }}
        spacing={{ base: 10, sm: 10, md: 10, lg: 10 }}
      >
        {members?.map((member: MemberType, index: number) => (
          <MemberCard
            key={index}
            member={member}
            isEditable={isEditable}
            group_id={group_id}
            creator_id={creator_id}
          />
        ))}
        {placeholders?.map((_, index: number) => (
          <ProfileIcon
            key={index}
            fontSize={{
              base: '5rem',
              md: '6rem',
              lg: '6rem',
              xl: '6.5rem',
            }}
          />
        ))}
        <Box position="absolute" right="0" top="0">
          <Box position="relative" float="right" right="2" top="2">
            {user?.id === creator_id ? (
              <>
                {isEditable === false ? (
                  <PenButton onClick={() => setIsEditable(true)} />
                ) : (
                  <IconButton
                    borderRadius="50"
                    onClick={() => setIsEditable(false)}
                    aria-label="Save"
                    colorScheme="green"
                    icon={<CheckIcon fontSize="1.3rem" />}
                  />
                )}
              </>
            ) : null}
          </Box>
        </Box>
      </SimpleGrid>
    </MainContainerLayout>
  );
};

export default MembersContainer;
