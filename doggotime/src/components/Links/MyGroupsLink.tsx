import { VStack } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { MyGroupsIcon } from "../Icons";
import { LinkLabel } from "../Text";

export const MyGroupsLink = () => {
  return (
    <Link to="/">
      <VStack>
        <MyGroupsIcon id="MyGroups" fontSize="4rem" />
        <LinkLabel htmlFor="MyGroups" label="Groups" />
      </VStack>
    </Link>
  );
};
