import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { DogPawn } from '../Icons/LightMode';
import { LinkLabel } from '../Text';

export const MyGroupsLink: React.FC = () => {
  return (
    <Link to="/">
      <VStack>
        <DogPawn id="MyGroups" width="12" height="12" />
        <LinkLabel htmlFor="MyGroups" label="My Groups" />
      </VStack>
    </Link>
  );
};
