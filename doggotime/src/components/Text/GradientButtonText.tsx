import { Text } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  fontSize: number;
}

export const GradientButtonText = ({ children, fontSize }: Props) => {
  return (
    <Text fontSize={fontSize} color="gray.800" casing="uppercase">
      {children}
    </Text>
  );
};
