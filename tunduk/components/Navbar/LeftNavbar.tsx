import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const LeftNavbar: React.FC = () => {
  const color = useColorModeValue('gray.800', 'white');
  return (
    <Box>
      <RouterLink to="/">
        <Box cursor="pointer">
          <Text fontSize={70} color={color}>
            It's Doggo Time
          </Text>
        </Box>
      </RouterLink>
    </Box>
  );
};
