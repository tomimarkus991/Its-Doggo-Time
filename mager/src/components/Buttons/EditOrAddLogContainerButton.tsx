import { Box, IconButton } from "@chakra-ui/react";

import { AddLogCheckboxIcon } from "../Icons";

interface Props {
  logData: any;
  onClick: () => void;
}

const EditOrAddLogContainerButton: React.FC<Props> = ({ logData, onClick }) => {
  return (
    <Box
      as={IconButton}
      onClick={onClick}
      mt={4}
      h="100%"
      aria-label="Add Edited Log Button"
      bgColor="transparent"
      _hover={{ bgColor: "transparent" }}
      isDisabled={logData?.length === 0}
      icon={
        <AddLogCheckboxIcon
          fontSize={{
            base: "5rem",
            md: "6rem",
            lg: "7rem",
          }}
        />
      }
    />
  );
};
export default EditOrAddLogContainerButton;
