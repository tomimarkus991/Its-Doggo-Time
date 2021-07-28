import { Box, useColorModeValue } from '@chakra-ui/react';

export const Line: React.FC = () => {
  const borderColor = useColorModeValue('gray.800', 'white');
  return <Box w="125px" borderBottom="2px" borderColor={borderColor} />;
};
