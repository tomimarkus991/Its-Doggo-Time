import { Center } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import React from 'react';
import LoggedIn from '../../components/LoggedIn';
import LoggedOut from '../../components/LoggedOut';
import { supabase } from '../../utils/supabaseClient';

const Home: React.FC = () => {
  const session: Session | null = supabase.auth.session();
  return (
    <Center h="100%">{session ? <LoggedIn /> : <LoggedOut />}</Center>
  );
};
export default Home;
