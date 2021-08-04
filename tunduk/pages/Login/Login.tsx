import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import LoginAuth from '../../components/Auth/Login';

const Login: React.FC = () => {
  return (
    <VStack spacing="10">
      <Heading fontSize={50}>Sign in to your account</Heading>
      <LoginAuth />
    </VStack>
  );
};
export default Login;
