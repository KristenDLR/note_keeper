import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from 'App';
import { UserAuthProvider } from 'context/userAuthContext';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from 'Router';
import { theme } from './theme';


// User AuthProvider intitalizes Supabase session login and exposes it via React Context
// RouterProvider renders app based on Router.tsx

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider theme={theme}>
        {/* Context sets up session tracking */}
        <UserAuthProvider> 
            {/* enables route handling */}
            <RouterProvider router={router} />
        </UserAuthProvider>
    </MantineProvider >
);
