import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const SignUpAlert: React.FC = () => {
  return (
    <Alert
      status="success"
      colorScheme="whatsapp"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mb={4}
      borderRadius="20"
      py={{ base: '10', sm: '10' }}
      w={{ base: 'xs', base2: 'sm', sm: 'md' }}
    >
      <AlertIcon w="10" h="10" mb="4" color="green.400" />
      <AlertTitle mt={4} mb={6} fontSize={{ base: '2xl', sm: '3xl' }}>
        <Text mb="2">Account Created</Text>
        <Text mb="2">Successfully</Text>
      </AlertTitle>
      <AlertDescription maxWidth="sm" fontSize={{ base: 'xl', sm: '2xl' }}>
        <Text mb="8">Please confirm your email</Text>
        <Text>You can close this tab now</Text>
      </AlertDescription>
    </Alert>
  );
};
export default SignUpAlert;
