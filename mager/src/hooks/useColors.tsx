import { useColorModeValue } from '@chakra-ui/react';

const useColors = () => {
  const defaultColor = useColorModeValue('#ffffff', 'gray.800');
  const defaultReversedColor = useColorModeValue('gray.800', '#ffffff');
  const penColor = useColorModeValue('#2A2828', '#E5E0D5');
  const containerItemColor = useColorModeValue('#DDCDBF', '#DDCDBF');
  const backIconColor = useColorModeValue('#2A2828', '#E5E0D5');

  const headerBackground3Color = useColorModeValue('#DDCDBF', '#373636');
  const headerBackground2Color = useColorModeValue('#E5E0D5', '#4B4949');
  const headerBackground1Color = useColorModeValue('#FBF0E5', '#6A6A6A');

  return {
    defaultColor,
    defaultReversedColor,
    penColor,
    containerItemColor,
    backIconColor,
    headerBackground3Color,
    headerBackground2Color,
    headerBackground1Color,
  };
};
export default useColors;
