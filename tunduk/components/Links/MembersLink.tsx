import { Box, FormLabel, IconButton, VStack } from '@chakra-ui/react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { LinkLabel } from '../Text';

interface Props {
  group_id: string;
}

export const MembersLink: React.FC<Props> = ({ group_id }) => {
  return (
    <Link to={`/group/${group_id}/members`}>
      <VStack>
        <FontAwesomeIcon
          id="Members"
          icon={faUsers}
          color="#DDCDBF"
          size="3x"
        />
        <LinkLabel htmlFor="Members" label="Members" />
      </VStack>
    </Link>
  );
};
