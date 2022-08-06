import { VStack } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { MembersIcon, LinkLabel } from "components";

interface Props {
  group_id: string;
}

export const MembersLink = ({ group_id }: Props) => {
  return (
    <Link to={`/group/${group_id}/members`}>
      <VStack>
        <MembersIcon id="Members" width="5rem" height="4rem" />
        <LinkLabel htmlFor="Members" label="Members" />
      </VStack>
    </Link>
  );
};
