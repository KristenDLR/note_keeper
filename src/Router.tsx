import ProtectedRoutes from 'components/protectedRoutes/protectedRoutes.component';
import PublicRoute from 'components/publicRoutes/publicRoutes.component';
import AuthCallback from 'pages/AuthCallBack/AuthCallback.page';
import Error from 'pages/Error/Error.page';
import HomePage from 'pages/Home/Home.page';
import Login from 'pages/Login/Login.page';
import Profile from 'pages/Profile/Profile.page';
import SignUp from 'pages/SignUp/SignUp.page';
import { createBrowserRouter } from 'react-router-dom';

// export function Router() {
//   const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
//   const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

//  const notesWithTags = useMemo(() => {
//     return notes.map((note) => {
//       return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
//     });
//   }, [notes, tags]);

//  function onCreateNote({ tags, ...data }: NoteData) {
//     setNotes((prevNotes) => {
//       return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) }];
//     });
//   }

//  function addTag(tag: Tag) {
//     setTags((prev) => [...prev, tag]);
//   }


export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes />,
    errorElement: <Error />,
    //! protected routes wrapped <ProtectedRoutes /> only load if session exists
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <Error />,
      },
      // {
      //   path: '/new',
      //   element: <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />,
      //   errorElement: <Error />,
      // },
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
  // {
  //   path: '/',
  //   element: <HomePage user={undefined} />,
  //   errorElement: <Error />,
  // },
  //! Public routes open to everyone
  {
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>,
    errorElement: <Error />,
  },
  {
    path: '/signup',
    element: <PublicRoute><SignUp /></PublicRoute>,
    errorElement: <Error />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
    errorElement: <Error />,
  }

]);

//   return <RouterProvider router={router} />;
// }
