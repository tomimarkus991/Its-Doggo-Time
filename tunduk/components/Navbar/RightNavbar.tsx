import { Button, HStack, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';

export const RightNavbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Button colorScheme="teal">
        <NextLink href="register">Register</NextLink>
      </Button>
      <Button colorScheme="teal">
        <NextLink href="login">Login</NextLink>
      </Button>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </HStack>
  );
};
