import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import Account from '../../components/Account';
import { AuthContext } from '../../context/authContext';

const Profile: React.FC = () => {
  const { session } = useContext(AuthContext);
  // const session: Session | null = supabase.auth.session();

  return (
    <Box>
      {session ? (
        <>
          <Account />
        </>
      ) : null}
    </Box>
  );
};
export default Profile;
