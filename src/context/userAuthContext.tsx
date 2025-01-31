import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from 'firebase/firebase.config';

interface IUserAuthProviderProps {
  children: React.ReactNode;
}

//defined the type of the data the context.API will hold
type AuthContextData = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
};

const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  return signOut(auth);
};

const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

//Created a context.API, and provide the initial value
export const userAuthContext = createContext<AuthContextData>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
});

//Created the Auth Provider that accepts the children as a prop
export const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({ children }) => {
  //need to create a state variable to observe theAuthStateChange
  //onAuthStateChange listens to the change event and get the user information, this is what the user gets pack
  const [user, setUser] = useState<User | null>(null);

  //listens to the Auth State change and provides the user information when logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('The logged in user state is: ', user);
        setUser(user);
      }
      return () => {
        unsubscribe();
      };
    });
  });
  const value: AuthContextData = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
  };
  return <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>;
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
