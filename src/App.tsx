import '@mantine/core/styles.css';

import { UserAuthProvider, useUserAuth } from 'context/userAuthContext';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from 'firebase/firebase.config';

export default function App() {
  const { setUser } = useUserAuth();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect login successful:", result.user);
          setUser(result.user);
        }
      })
      .catch((error) => console.error("Error handling redirect:", error));
  }, []);
  
  return (
    <UserAuthProvider>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </UserAuthProvider>
  );
}
