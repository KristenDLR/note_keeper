import { useMemo } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import Error from 'pages/Error/Error.page';
import HomePage from 'pages/Home/Home.page';
import Login from 'pages/Login/Login.page';
import NewNote from 'pages/NewNote/NewNote.page';
import Profile from 'pages/Profile/Profile.page';
import SignUp from 'pages/SignUp/SignUp.page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NoteData, RawNote, Tag } from 'types';
import { v4 as uuidV4 } from 'uuid';
import { ProtectedRoutes } from 'components/protectedRoutes/protectedRoutes.component';

export function Router() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) }];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

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
          element: <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />,
          errorElement: <Error />,
        },
        {
          path: '/:id',
          element: <ProtectedRoutes notes={notesWithTags} />,
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
      element: <HomePage availableTags={tags} notes={notesWithTags} />,
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

  return <RouterProvider router={router} />;
}
