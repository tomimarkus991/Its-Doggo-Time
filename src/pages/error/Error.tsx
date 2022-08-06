import { Center, Heading, Text, VStack } from "@chakra-ui/react";

import { Link } from "react-router-dom";

export const Error = (): JSX.Element => {
  return (
    <Center w="100%" h="60%">
      <VStack>
        <Heading size={"2xl"} mb="4">
          404 - Not Found
        </Heading>
        <Link to="/">
          <Text fontSize="xl">Back to Home</Text>
        </Link>
      </VStack>
    </Center>
  );
};
