import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import LoginAuth from '../../components/Auth/Login';

const Login: React.FC = () => {
  return (
    <VStack spacing="10">
      <Heading size={'2xl'}>Sign in to your account</Heading>
      <LoginAuth />
    </VStack>
  );
};
export default Login;
