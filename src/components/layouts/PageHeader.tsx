import { Center, Heading } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const PageHeader = ({ children }: Props) => {
  return (
    <Center id="Page Header">
      <Heading fontSize="4xl">{children}</Heading>
    </Center>
  );
};
