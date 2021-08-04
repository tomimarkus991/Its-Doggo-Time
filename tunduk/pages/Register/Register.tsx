import { Heading, VStack } from '@chakra-ui/react';
import RegisterAuth from '../../components/Auth/Register';

const Register: React.FC = () => {
  return (
    <VStack spacing={{ base: '10' }}>
      <Heading
        display={{ base: 'none', sm: 'block' }}
        fontSize={{ base: '2xl', sm: '4xl' }}
      >
        Create an account
      </Heading>
      <RegisterAuth />
    </VStack>
  );
};
export default Register;
