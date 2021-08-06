import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { MyGroupsIcon } from '../Icons/Navbar';
import { LinkLabel } from '../Text';

export const MyGroupsLink: React.FC = () => {
  return (
    <Link to="/">
      <VStack>
        <MyGroupsIcon id="MyGroups" fontSize="4rem" />
        <LinkLabel htmlFor="MyGroups" label="Groups" />
      </VStack>
    </Link>
  );
};
