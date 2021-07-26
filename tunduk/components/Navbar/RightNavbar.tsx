import { Box } from '@chakra-ui/react';
import { DoggoLight } from '../Icons/LightMode';

export const RightNavbar: React.FC = () => {
  // const { session } = useContext(AuthContext);

  return (
    <Box>
      <DoggoLight />
      {/* {session ? null : (
        <RouterLink to="/login">
          <Button colorScheme="teal">Login</Button>
        </RouterLink>
      )} */}
    </Box>
  );
};
