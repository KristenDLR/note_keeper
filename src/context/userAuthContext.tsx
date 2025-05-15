import { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from 'supabase/client';

interface IUserAuthProviderProps {
  children: React.ReactNode;
}

//defined the type of the data the context.API will hold
type AuthContextData = {
  // user: User | null;
  session: Session | null;

  login: typeof login;
  signUp: typeof signUp;
  signOut: typeof signOut;
  // logOut: typeof logOut;
  // googleSignIn: typeof googleSignIn;
};

// Sign Up
const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    console.log('there was a problem signing up:', error)
    return { success: false, error };
  }
  return { success: true, data };
}

// Sign out
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('there was an error:', error)
  }
};

// Login
const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("sign in error occured: ", error);
      return { success: false, error: error.message };
    }
    // Todo: remove console.log
    console.log("login success: ", data);
    return { success: true, data };
}

//Created a context.API, and provide the initial value
export const userAuthContext = createContext<AuthContextData>({
  session: null,
  signUp,
  signOut,
  login

});

//Created the Auth Provider that accepts the children as a prop
export const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({ children }) => {
  //need to create a state variable to observe theAuthStateChange
  //onAuthStateChange listens to the change event and get the user information, this is what the user gets pack
  // const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null)


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    });

    //Subscribes to Supabase auth state , srotes current session in React context
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth Event:', event);
      console.log('New Session:', session);
      setSession(session)
    })

  }, []);

  const value: AuthContextData = {
    session,
    signUp,
    signOut,
    login
  };
  return <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>;
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
