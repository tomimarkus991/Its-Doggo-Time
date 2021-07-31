import { VStack } from '@chakra-ui/react';
import React from 'react';
import LoginAuth from '../../components/Auth/Login';
import ColorMode from '../../components/ColorMode';
import { Heading } from '../../components/Headers';

const Login: React.FC = () => {
  return (
    <VStack spacing="10">
      <Heading title="Sign in to your account" />
      <LoginAuth />
      <ColorMode />
    </VStack>
  );
};
export default Login;
