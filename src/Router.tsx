import ProtectedRoutes from 'components/protectedRoutes/protectedRoutes.component';
import Error from 'pages/Error/Error.page';
import HomePage from 'pages/Home/Home.page';
import Login from 'pages/Login/Login.page';
import NewNote from 'pages/NewNote/NewNote.page';
import Profile from 'pages/Profile/Profile.page';
import SignUp from 'pages/SignUp/SignUp.page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: '/new',
        element: <NewNote />,
        errorElement: <Error />,
      },
      {
        path: '/:id',
        children: [
          {
            index: true,
            element: <h1>Show</h1>,
            errorElement: <Error />,
          },
          {
            path: 'edit',
            element: <h1>Edit</h1>,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <Error />,
  },
  
]);

export function Router() {
  return <RouterProvider router={router} />;
}
