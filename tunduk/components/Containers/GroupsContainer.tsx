import {
  Box,
  Center,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GroupType, StringOrUndefined } from '../../types';
import { GroupCard } from '../Cards';
import { Heading } from '../Headers';
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
    const max = 6;
    if (!userGroups) return;
    const _paws = max - userGroups.length;
    const dogPawns: string[] = [];

    for (let i = 1; i <= _paws; i++) {
      dogPawns.push('paw');
    }
    setPaws(dogPawns);
  };

  const howManyGroupsUserHas = () => {
    if (userGroups?.length === 6) {
      setIsAddDoggoGroupDisabled(true);
    }
  };

  useEffect(() => {
    getPaws();
    howManyGroupsUserHas();
  }, [userGroups]);

  return (
    <MainContainerLayout
      button={
        <Link to="/group/create-group">
          <IconButton
            aria-label="Add new doggo group"
            size="sm"
            w="100%"
            h="100%"
            p={2}
            borderRadius="100"
            isDisabled={isAddDoggoGroupDisabled || username === null}
            bgColor="transparent"
            _hover={{ bgColor: 'transparent' }}
            icon={<AddGroupIcon width="28" height="28" />}
          />
        </Link>
      }
      isLoading={isLoading}
      containerProps={{ w: '2xl', h: 'sm' }}
    >
      {userGroups === null ||
      userGroups === undefined ||
      userGroups.length === 0 ? (
        <Center>
          <VStack textAlign="center">
            <Heading title="No groups created yet" fontSize={50} />
            <Text fontSize="2xl" maxW="lg">
              Create a new doggo group to connect with your family members
              and have a look what your doggo has been up to.
            </Text>
          </VStack>
        </Center>
      ) : (
        <SimpleGrid columns={3} spacing={10}>
          {userGroups.map((group: GroupType, index: number) => (
            <Box key={index}>
              <GroupCard group={group} />
            </Box>
          ))}
          {paws?.map((_, index: number) => (
            <Box key={index}>
              <DogPawn width="115" height="115" />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </MainContainerLayout>
  );
};
