import { Box, useCheckbox } from '@chakra-ui/react';
import { PeeIcon, PoopIcon } from '../Icons/Logs';

export const CheckboxCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        opacity={0.3}
        _checked={{
          opacity: 1,
          color: 'white',
        }}
        px={5}
        py={3}
      >
        {props.children === 'pee' ? (
          <PeeIcon fontSize={{ base: '6rem', md: '7rem', lg: '8rem' }} />
        ) : (
          <PoopIcon fontSize={{ base: '6rem', md: '7rem', lg: '8rem' }} />
        )}
      </Box>
    </Box>
  );
};
