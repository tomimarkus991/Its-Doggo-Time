import { Flex, Text } from '@chakra-ui/react';

interface Props {
  title: string;
}

export const Heading: React.FC<Props> = ({ title }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyItems="center">
      <Text fontSize={50}>{title}</Text>
    </Flex>
  );
};
