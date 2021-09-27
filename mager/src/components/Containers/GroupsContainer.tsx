import {
  Box,
  Center,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGroup } from '../../context/GroupContext';
import { useUser } from '../../context/UserContext';
import useGroupsPlaceholder from '../../hooks/placeholders/useGroupsPlaceholder';
import { GroupType } from '../../types';
import { GroupCard } from '../Cards';
import { AddGroupIcon, DogPaw } from '../Icons';
import { MainContainerLayout } from '../Layouts';

interface Props {
  isLoading: boolean;
}

const GroupsContainer: React.FC<Props> = ({ isLoading }) => {
  const { groups } = useGroup();
  const { username } = useUser();
  const { placeholders, isAddDoggoGroupDisabled } =
    useGroupsPlaceholder(groups);

  return (
    <MainContainerLayout
      mainH="sm"
      isLoading={isLoading}
      button={
        <Link to="/group/create-group">
          <Box
            as={IconButton}
            aria-label="Add new doggo group"
            h="100%"
            bgColor="transparent"
            _hover={{ bgColor: 'transparent' }}
            isDisabled={isAddDoggoGroupDisabled || username === null}
            icon={
              <AddGroupIcon
                fontSize={{
                  base: '5rem',
                  md: '6rem',
                  lg: '7rem',
                }}
              />
            }
          />
        </Link>
      }
      containerProps={{
        w: {
          base: 'xs',
          sm: 'sm',
          md: 'md',
          lg: 'md',
          xl: 'lg',
        },
        h: 'sm',
      }}
    >
      {groups === null || groups === undefined || groups.length === 0 ? (
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
        <SimpleGrid
          id="10"
          columns={{ base: 2 }}
          spacing={{ base: 10, lg: 10 }}
        >
          {groups.map((group: GroupType, index: number) => (
            <GroupCard key={index} group={group} />
          ))}
          {placeholders?.map((_, index: number) => (
            <DogPaw key={index} fontSize={{ base: '6rem', lg: '8rem' }} />
          ))}
        </SimpleGrid>
      )}
    </MainContainerLayout>
  );
};

export default GroupsContainer;
