import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import LoginAuth from '../../components/Auth/Login';

const Login: React.FC = () => {
  return (
    <VStack spacing={{ base: '10' }}>
      <Heading
        display={{ base: 'none', sm: 'block' }}
        fontSize={{ base: '2xl', sm: '4xl' }}
      >
        Sign in to your account
      </Heading>
      <LoginAuth />
    </VStack>
  );
};
export default Login;
