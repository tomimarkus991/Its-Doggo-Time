import { Box, IconButton } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { AddGroupIcon } from "../Icons";

interface Props {
  isAddDoggoGroupDisabled: boolean;
}

const CreateGroupContainerButton: React.FC<Props> = ({ isAddDoggoGroupDisabled }) => {
  return (
    <Link to="/group/create-group">
      <Box
        as={IconButton}
        aria-label="Add new doggo group"
        h="100%"
        bgColor="transparent"
        _hover={{ bgColor: "transparent" }}
        isDisabled={isAddDoggoGroupDisabled}
        icon={
          <AddGroupIcon
            fontSize={{
              base: "5rem",
              md: "6rem",
              lg: "7rem",
            }}
          />
        }
      />
    </Link>
  );
};
export default CreateGroupContainerButton;
