import { Text, TextProps } from "@chakra-ui/react";

interface Props {
  name: string | undefined;
  textProps?: TextProps;
}

export const Name = ({ name, textProps }: Props) => {
  return (
    <Text
      textAlign="center"
      fontSize={{ base: 50, sm: 40, sm2: 35, lg: 52 }}
      maxW={{ base: "16rem", sm: "20rem", md: "16rem" }}
      {...textProps}
    >
      {name}
    </Text>
  );
};
