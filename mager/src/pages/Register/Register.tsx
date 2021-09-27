import { Heading, VStack } from '@chakra-ui/react';
import { RegisterAuth } from '../../components/Auth';

const Register: React.FC = () => {
  return (
    <VStack zIndex={2} spacing={{ base: '10' }}>
      <Heading
        zIndex={2}
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
