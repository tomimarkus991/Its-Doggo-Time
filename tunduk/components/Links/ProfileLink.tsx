import { IconButton } from '@chakra-ui/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export const ProfileLink: React.FC = () => {
  return (
    <Link to="/profile">
      <IconButton
        aria-label="Profile"
        icon={<FontAwesomeIcon icon={faUser} color="#DDCDBF" />}
      />
    </Link>
  );
};
