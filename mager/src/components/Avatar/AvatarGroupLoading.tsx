import { Center } from "@chakra-ui/react";

import { DefaultSpinner } from "../Spinners";

const AvatarGroupLoading = () => {
  return (
    <Center
      w={{ base: "7rem", sm: "7rem", md: "9rem" }}
      h={{ base: "7rem", sm: "7rem", md: "9rem" }}
    >
      <DefaultSpinner />
    </Center>
  );
};

export default AvatarGroupLoading;
