import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { NewNote } from './pages/NewNote';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/new',
    element: <NewNote />,
  },
  {
    path: '/:id',
    children: [
      {
        index: true,
        element: <h1>Show</h1>,
      },
      {
        path: 'edit',
        element: <h1>Edit</h1>,
      }
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
