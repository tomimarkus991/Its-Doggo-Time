import { IconButton } from '@chakra-ui/react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  group_id: string;
}

export const MembersLink: React.FC<Props> = ({ group_id }) => {
  return (
    <Link to={`/group/${group_id}/members`}>
      <IconButton
        aria-label="Members"
        icon={<FontAwesomeIcon icon={faUsers} color="#DDCDBF" />}
      />
    </Link>
  );
};
