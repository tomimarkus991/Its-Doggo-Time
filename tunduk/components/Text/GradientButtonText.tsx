import { Text } from '@chakra-ui/react';

interface Props {
  fontSize: number;
}

export const GradientButtonText: React.FC<Props> = ({
  children,
  fontSize,
}) => {
  return (
    <Text fontSize={fontSize} color="gray.800" textTransform="uppercase">
      {children}
    </Text>
  );
};