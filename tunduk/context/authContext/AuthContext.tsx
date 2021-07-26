import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

interface AuthContextType {
  session: Session | null;
  setSession: any;
}
const initAuthContext = {
  session: null,
  setSession: () => undefined,
};

export const AuthContext = createContext<AuthContextType>(initAuthContext);

const AuthDetailsProvider = (props: any) => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthDetailsProvider;
