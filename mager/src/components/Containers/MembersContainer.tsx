import { Box, IconButton, SimpleGrid } from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useMembersPlaceholder from '../../hooks/placeholders/useMembersPlaceholder';
import { ProfileType, StringOrUndefined } from '../../types';
import { MemberCard } from '../Cards';
import { ProfileIcon } from '../Icons/Navbar';
import MainContainerLayout from '../Layouts/Containers';
import { CheckIcon } from '@chakra-ui/icons';
import { useAuth } from '../../context/authContext/AuthContext';
import useColors from '../../hooks/useColors';
interface Props {
  members: ProfileType[] | undefined;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  group_id: StringOrUndefined;
  creator_id: StringOrUndefined;
  isLoading: boolean;
  AddNewMember: any;
}

export const MembersContainer: React.FC<Props> = ({
  members,
  isEditable,
  setIsEditable,
  group_id,
  creator_id,
  isLoading,
  AddNewMember,
}) => {
  const { placeholders } = useMembersPlaceholder(members);
  const { user } = useAuth();
  const { penColor } = useColors();

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
        <Box position="absolute" right="0" top="0">
          <Box position="relative" float="right" right="2" top="2">
            {user?.id === creator_id && isEditable === false ? (
              <IconButton
                onClick={() => setIsEditable(true)}
                aria-label="Edit"
                bgColor="transparent"
                _hover={{ bgColor: 'transparent' }}
                icon={
                  <FontAwesomeIcon
                    icon={faPen}
                    size={'lg'}
                    color={penColor}
                  />
                }
              />
            ) : null}
            {user?.id === creator_id && isEditable ? (
              <IconButton
                borderRadius="50"
                onClick={() => setIsEditable(false)}
                aria-label="Save"
                colorScheme="green"
                icon={<CheckIcon color="white" />}
              />
            ) : null}
          </Box>
        </Box>
      </SimpleGrid>
    </MainContainerLayout>
  );
};
