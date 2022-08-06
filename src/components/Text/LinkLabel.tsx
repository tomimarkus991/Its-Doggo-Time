import { FormLabel } from "@chakra-ui/react";

interface Props {
  htmlFor: string;
  label: string;
}

export const LinkLabel = ({ htmlFor, label }: Props) => {
  return (
    <FormLabel
      htmlFor={htmlFor}
      display={{ base: "none", lg: "block" }}
      textAlign="center"
      fontSize="md"
      cursor="pointer"
      textTransform="uppercase"
    >
      {label}
    </FormLabel>
  );
};
