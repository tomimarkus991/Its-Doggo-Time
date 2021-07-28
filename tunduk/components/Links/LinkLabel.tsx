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
      fontSize="xl"
      m={0}
      cursor="pointer"
    >
      {label}
    </FormLabel>
  );
};
