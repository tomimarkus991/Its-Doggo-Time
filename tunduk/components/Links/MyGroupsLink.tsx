import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { DogPawn } from '../Icons/LightMode';

export const MyGroupsLink: React.FC = () => {
  return (
    <Link to="/">
      <IconButton aria-label="My Groups" icon={<DogPawn />} />
    </Link>
  );
};
