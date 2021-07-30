import { Center, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../Buttons';

const LoggedOut: React.FC = () => {
  return (
    <Center>
      <Link to="/login">
        <GradientButton>
          <Text fontSize={30} color="gray.800">
            Log in
          </Text>
        </GradientButton>
      </Link>
    </Center>
  );
};
export default LoggedOut;
