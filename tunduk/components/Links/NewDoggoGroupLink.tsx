import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../Buttons';

export const NewDoggoGroupLink: React.FC = () => {
  return (
    <Link to="/group/create-group">
      <GradientButton>New Doggo Group</GradientButton>
    </Link>
  );
};
