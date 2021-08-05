import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { MembersIcon } from '../Icons/Navbar';
import { LinkLabel } from '../Text';

interface Props {
  group_id: string;
}

export const MembersLink: React.FC<Props> = ({ group_id }) => {
  return (
    <Link to={`/group/${group_id}/members`}>
      <VStack>
        <MembersIcon id="Members" width="5.5rem" height="4rem" />
        <LinkLabel htmlFor="Members" label="Members" />
      </VStack>
    </Link>
  );
};
