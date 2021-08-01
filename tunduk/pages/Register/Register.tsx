import { VStack } from '@chakra-ui/react';
import RegisterAuth from '../../components/Auth/Register';
import { Heading } from '../../components/Headers';

const Register: React.FC = () => {
  return (
    <VStack spacing="10">
      <Heading title="Create an account" />
      <RegisterAuth />
    </VStack>
  );
};
export default Register;
