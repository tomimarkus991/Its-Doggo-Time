import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GroupType, StringOrUndefined } from '../../types';
import { AddNewIconButton } from '../Buttons';
import { GroupCard } from '../Cards';
import { AddGroupIcon } from '../Icons/Doggo';
import { DogPawn } from '../Icons/LightMode';
import MainContainerLayout from '../Layouts/Containers';

interface Props {
  userGroups: GroupType[] | undefined;
  isLoading: boolean;
  username: StringOrUndefined;
}

export const GroupsContainer: React.FC<Props> = ({
  userGroups,
  isLoading,
  username,
}) => {
  const [paws, setPaws] = useState<string[]>();
  const [isAddDoggoGroupDisabled, setIsAddDoggoGroupDisabled] =
    useState<boolean>(false);

  const getPaws = () => {
    const max = 4;
    if (!userGroups) return;
    const _paws = max - userGroups.length;
    const dogPawns: string[] = [];

    for (let i = 1; i <= _paws; i++) {
      dogPawns.push('paw');
    }
    setPaws(dogPawns);
  };

  const howManyGroupsUserHas = () => {
    if (userGroups?.length === 4) {
      setIsAddDoggoGroupDisabled(true);
    }
  };

  useEffect(() => {
    getPaws();
    howManyGroupsUserHas();
  }, [userGroups]);

  return (
    <MainContainerLayout
      mainH="sm"
      isLoading={isLoading}
      button={
        <AddNewIconButton
          to="/group/create-group"
          icon={
            <AddGroupIcon
              fontSize={{
                base: '5rem',
                md: '6rem',
                lg: '7rem',
              }}
            />
          }
          ariaLabel="Add new doggo group"
          isDisabled={isAddDoggoGroupDisabled || username === null}
        />
      }
      containerProps={{
        w: {
          base: 'xs',
          sm: 'md',
          md: 'md',
          lg: 'lg',
          xl: 'xl',
        },
        h: 'sm',
      }}
    >
      {userGroups === null ||
      userGroups === undefined ||
      userGroups.length === 0 ? (
        <Center h="100%" px={{ base: '8', sm: 0 }}>
          <VStack textAlign="center">
            <Heading fontSize={{ base: '2xl', lg: '4xl' }}>
              No groups created yet
            </Heading>
            <Text fontSize={{ base: 'xl', lg: '2xl' }} maxW="lg">
              Create a new doggo group to connect with your family members
              and have a look what your doggo has been up to.
            </Text>
          </VStack>
        </Center>
      ) : (
        <SimpleGrid id="10" columns={{ base: 2 }} spacing={10}>
          {userGroups.map((group: GroupType, index: number) => (
            <Box key={index}>
              <GroupCard group={group} />
            </Box>
          ))}
          {paws?.map((_, index: number) => (
            <Box key={index}>
              <DogPawn fontSize={{ base: '6rem', lg: '8rem' }} />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </MainContainerLayout>
  );
};
