import '@mantine/core/styles.css';

import { UserAuthProvider } from 'context/userAuthContext';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <UserAuthProvider>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </UserAuthProvider>
  );
}
