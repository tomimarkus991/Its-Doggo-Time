import { Heading, VStack } from '@chakra-ui/react';
import RegisterAuth from '../../components/Auth/Register';

const Register: React.FC = () => {
  return (
    <VStack spacing="10">
      <Heading size={'2xl'}>Create an account</Heading>
      <RegisterAuth />
    </VStack>
  );
};
export default Register;
