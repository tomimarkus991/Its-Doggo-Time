import { VStack } from '@chakra-ui/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { LinkLabel } from '../Text';

export const ProfileLink: React.FC = () => {
  return (
    <Link to="/profile">
      <VStack>
        <FontAwesomeIcon
          id="Profile"
          icon={faUser}
          color="#DDCDBF"
          size="3x"
        />
        <LinkLabel htmlFor="Profile" label="My Profile" />
      </VStack>
    </Link>
  );
};
