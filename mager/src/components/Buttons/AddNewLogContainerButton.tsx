import { Box, IconButton } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { AddLogIcon } from "../Icons";

interface Props {
  group_id: string;
}

const AddNewLogContainerButton: React.FC<Props> = ({ group_id }) => {
  return (
    <Link to={`/group/${group_id}/add-log`}>
      <Box
        as={IconButton}
        aria-label="Add new Log"
        h="100%"
        bgColor="transparent"
        _hover={{ bgColor: "transparent" }}
        isDisabled={false}
        icon={
          <AddLogIcon
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
export default AddNewLogContainerButton;
