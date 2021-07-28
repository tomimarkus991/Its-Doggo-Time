import { Session } from '@supabase/supabase-js';
import React from 'react';
import LoggedIn from '../../components/LoggedIn';
import LoggedOut from '../../components/LoggedOut';
import { supabase } from '../../utils/supabaseClient';

const Home: React.FC = () => {
  const session: Session | null = supabase.auth.session();
  return <>{session ? <LoggedIn /> : <LoggedOut />}</>;
};
export default Home;
