import { Center, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Error = (): JSX.Element => {
  return (
    <Center>
      <VStack>
        <Heading>404 - Not Found</Heading>
        <Link to="/">Back to Home</Link>
      </VStack>
    </Center>
  );
};

export default Error;
