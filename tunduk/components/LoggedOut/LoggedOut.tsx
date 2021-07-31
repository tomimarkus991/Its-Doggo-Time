import { Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../Buttons';
import { GradientButtonText } from '../Text';

const LoggedOut: React.FC = () => {
  return (
    <Center>
      <Link to="/login">
        <GradientButton>
          <GradientButtonText fontSize={30}>Log in</GradientButtonText>
        </GradientButton>
      </Link>
    </Center>
  );
};
export default LoggedOut;
