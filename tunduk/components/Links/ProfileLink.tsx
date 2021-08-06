import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileIcon } from '../Icons/Navbar';
import { LinkLabel } from '../Text';

export const ProfileLink: React.FC = () => {
  return (
    <Link to="/profile">
      <VStack>
        <ProfileIcon fontSize="3.6rem" />
        <LinkLabel htmlFor="Profile" label="Profile" />
      </VStack>
    </Link>
  );
};
