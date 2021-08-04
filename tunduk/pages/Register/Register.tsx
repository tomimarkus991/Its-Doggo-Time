import { Heading, VStack } from '@chakra-ui/react';
import RegisterAuth from '../../components/Auth/Register';

const Register: React.FC = () => {
  return (
    <VStack spacing="10">
      <Heading fontSize={50}>Create an account</Heading>
      <RegisterAuth />
    </VStack>
  );
};
export default Register;
