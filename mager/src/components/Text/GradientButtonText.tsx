import { Text } from "@chakra-ui/react";

interface Props {
  fontSize: number;
}

const GradientButtonText: React.FC<Props> = ({ children, fontSize }) => {
  return (
    <Text fontSize={fontSize} color="gray.800" casing="uppercase">
      {children}
    </Text>
  );
};

export default GradientButtonText;
