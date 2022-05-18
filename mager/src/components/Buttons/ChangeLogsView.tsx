import { Box, HStack } from "@chakra-ui/react";

import React from "react";

import { useLogsView, ViewType } from "context";
import { ExcrementViewIcon, FoodViewIcon } from "../Icons";

const ChangeLogsView: React.FC = () => {
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
export default ChangeLogsView;
