import { FormLabel } from "@chakra-ui/react";

interface Props {
  htmlFor: string;
  label: string;
}

const LinkLabel: React.FC<Props> = ({ htmlFor, label }) => {
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

export default LinkLabel;
