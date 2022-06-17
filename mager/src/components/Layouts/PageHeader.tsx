import { Center, Heading } from "@chakra-ui/react";

export const PageHeader = ({ children }) => {
  return (
    <Center id="Page Header">
      <Heading fontSize="4xl">{children}</Heading>
    </Center>
  );
};
