import { VStack } from '@chakra-ui/react';
import LoginAuth from '../../components/Auth/Login';
import { Heading } from '../../components/Headers';

const Login: React.FC = () => {
  return (
    <VStack spacing="10">
      <Heading title="Sign in to your account" />
      <LoginAuth />
    </VStack>
  );
};
export default Login;
