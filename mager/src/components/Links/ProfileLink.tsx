import { VStack } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { ProfileIcon } from "../Icons";
import { LinkLabel } from "../Text";

export const ProfileLink = () => {
  return (
    <Link to="/profile">
      <VStack>
        <ProfileIcon fontSize="3.6rem" />
        <LinkLabel htmlFor="Profile" label="Profile" />
      </VStack>
    </Link>
  );
};
