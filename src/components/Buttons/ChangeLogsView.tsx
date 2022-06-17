import { Box, HStack } from "@chakra-ui/react";

import { useLogsView, ViewType } from "context";

import { ExcrementViewIcon, FoodViewIcon } from "../Icons";

export const ChangeLogsView = () => {
  const { setView } = useLogsView();

  return (
    <HStack justifyContent="center">
      <Box
        as={ExcrementViewIcon}
        onClick={() => setView(ViewType.Excrement)}
        fontSize={{ base: "5rem", md: "6rem" }}
        cursor="pointer"
      />
      <Box
        as={FoodViewIcon}
        onClick={() => setView(ViewType.Food)}
        fontSize={{ base: "5rem", md: "6rem" }}
        cursor="pointer"
      />
    </HStack>
  );
};
