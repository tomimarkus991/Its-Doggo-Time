import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const initAuthContext = {
  user: supabase.auth.session()?.user,
};

const AuthContext = createContext(initAuthContext);

export const useAuth = () => useContext(AuthContext);

const AuthDetailsProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    user,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthDetailsProvider;
