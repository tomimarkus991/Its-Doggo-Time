import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const AuthContext = createContext({
  signUp: (data: any) => supabase.auth.signUp(data),
  signIn: (data: any) => supabase.auth.signIn(data),
  signOut: () => supabase.auth.signOut(),
  user: supabase.auth.session()?.user,
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthDetailsProvider = ({ children }: { children: any }) => {
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
    signUp: (data: any) => supabase.auth.signUp(data),
    signIn: (data: any) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthDetailsProvider;
