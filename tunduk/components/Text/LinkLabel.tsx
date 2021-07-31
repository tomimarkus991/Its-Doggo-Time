import { FormLabel } from '@chakra-ui/react';

interface Props {
  htmlFor: string;
  label: string;
}

export const LinkLabel: React.FC<Props> = ({ htmlFor, label }) => {
  return (
    <FormLabel
      htmlFor={htmlFor}
      textAlign="center"
      fontSize="md"
      m={0}
      cursor="pointer"
      textTransform="uppercase"
    >
      {label}
    </FormLabel>
  );
};
