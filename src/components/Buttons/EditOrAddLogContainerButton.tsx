import { Box, IconButton } from "@chakra-ui/react";

import { AddLogCheckboxIcon } from "components";

interface Props {
  logData: any;
  onClick: () => void;
}

export const EditOrAddLogContainerButton = ({ logData, onClick }: Props) => {
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
