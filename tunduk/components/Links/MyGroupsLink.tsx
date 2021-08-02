import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { PawIcon } from '../Icons/Navbar';
import { LinkLabel } from '../Text';

export const MyGroupsLink: React.FC = () => {
  return (
    <Link to="/">
      <VStack>
        <PawIcon id="MyGroups" width="4.5rem" height="4rem" />
        <LinkLabel htmlFor="MyGroups" label="My Groups" />
      </VStack>
    </Link>
  );
};
