import { useColorModeValue } from '@chakra-ui/react';

const useColors = () => {
  const defaultColor = useColorModeValue('#ffffff', 'gray.800');
  const defaultReversedColor = useColorModeValue('gray.800', '#ffffff');
  const penColor = useColorModeValue('#2A2828', '#E5E0D5');
  const backIconColor = useColorModeValue('#2A2828', '#E5E0D5');
  return { defaultColor, defaultReversedColor, penColor, backIconColor };
};
export default useColors;
