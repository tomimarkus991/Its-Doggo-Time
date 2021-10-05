import { Box, useCheckbox } from '@chakra-ui/react';
import { FoodIcon, PeeIcon, PoopIcon } from '../Icons';

const CheckboxCard = (props: any) => {
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
        px={3}
        py={3}
      >
        {props.children === 'pee' && (
          <PeeIcon fontSize={{ base: '7.5rem', sm: '8rem' }} />
        )}
        {props.children === 'poop' && (
          <PoopIcon fontSize={{ base: '7.5rem', sm: '8rem' }} />
        )}
        {props.children === 'food' && (
          <FoodIcon fontSize={{ base: '7.5rem', sm: '8rem' }} />
        )}
      </Box>
    </Box>
  );
};

export default CheckboxCard;
