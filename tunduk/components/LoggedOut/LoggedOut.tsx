import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LoggedOut: React.FC = () => {
  return (
    <Box>
      <Link to="/login">
        <Text>You are logged out</Text>
      </Link>
    </Box>
  );
};
export default LoggedOut;
