import { Center, Heading, Text, VStack } from "@chakra-ui/react";

const LogEmptyPlaceholder: React.FC = () => {
  return (
    <Center h="100%">
      <VStack textAlign="center">
        <Heading fontSize={{ base: "2xl", lg: "4xl" }}>Log is Empty</Heading>
        <Text fontSize={{ base: "xl", lg: "2xl" }} maxW="lg">
          Press the button in bottom right to add a new log
        </Text>
      </VStack>
    </Center>
  );
};
export default LogEmptyPlaceholder;
