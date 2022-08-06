import { Center, Text, VStack } from "@chakra-ui/react";

import { DefaultFoodIcon } from "../Icons";

export const FoodLogPlaceholder = () => {
  return (
    <Center>
      <VStack>
        <DefaultFoodIcon
          fontSize={{
            base: "6rem",
            sm2: "6.5rem",
            md: "7.5rem",
            lg: "7rem",
            xl: "7.5rem",
          }}
        />
        <Text textAlign="center" fontSize={{ base: "xl", sm: "xl", md: "2xl" }}>
          &nbsp;
        </Text>
      </VStack>
    </Center>
  );
};
