import React from 'react';
import LoggedIn from '../../components/LoggedIn';
import LoggedOut from '../../components/LoggedOut';
import { useAuth } from '../../context/authContext/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  return <>{user ? <LoggedIn /> : <LoggedOut />}</>;
};
export default Home;
