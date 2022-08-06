import { Flex, Spacer } from "@chakra-ui/react";

import { DoggoIcon } from "../Icons";

export const HeaderAvatar = ({ children }) => {
  return (
    <Flex
      id="HeaderAvatar"
      px={{ sm: "6", lg: "none" }}
      pt={{ sm: "6", lg: "none" }}
      w="100%"
      justifyContent={{ sm: "flex-start", lg: "center" }}
      alignItems="center"
      flexDirection={{ sm: "row", lg: "column" }}
    >
      {children}
      <Spacer display={{ sm: "initial", lg: "none" }} />
      <DoggoIcon
        display={{ base: "none", sm: "initial", lg: "none" }}
        fontSize={{
          base: "none",
          sm: "8rem",
          sm2: "10rem",
          md: "12rem",
        }}
      />
    </Flex>
  );
};
