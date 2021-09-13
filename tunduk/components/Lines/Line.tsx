import { Box } from '@chakra-ui/react';
import useColors from '../../hooks/useColors';

export const Line: React.FC = () => {
  const { defaultReversedColor } = useColors();
  return (
    <Box w="125px" borderBottom="2px" borderColor={defaultReversedColor} />
  );
};
