import { Flex, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  fontSize: number;
}

export const Heading: React.FC<Props> = ({ title, fontSize }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyItems="center">
      <Text fontSize={fontSize}>{title}</Text>
    </Flex>
  );
};
