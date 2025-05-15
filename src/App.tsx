// import '@mantine/core/styles.css';



// import type { Session } from '@supabase/supabase-js';
// import HomePage from 'pages/Home/Home.page';
// import Login from 'pages/Login/Login.page';
// import { useEffect, useState } from 'react';
// import { supabase } from 'supabase/client';

// export default function App() {
//   const [session, setSession] = useState<Session | null>(null);

//   //taken from Router.tsx
//   // const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
//   // const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

//   // const notesWithTags = useMemo(() => {
//   //   return notes.map((note) => {
//   //     return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
//   //   });
//   // }, [notes, tags]);

//   // function onCreateNote({ tags, ...data }: NoteData) {
//   //   setNotes((prevNotes) => {
//   //     return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) }];
//   //   });
//   // }

//   // function addTag(tag: Tag) {
//   //   setTags((prev) => [...prev, tag]);
//   // }


//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//     return () => subscription.unsubscribe()
//   }, [])


//   if (!session) {
//     // return (<MantineProvider theme={theme}><Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /></MantineProvider >)
//     return (
//       <Login />
//     )
//   }
//   else {
//     return (<HomePage user={session} />)
//   }

//   // return (
//   //   // <UserAuthProvider>
//   //   <MantineProvider theme={theme}>
//   //     <Router />
//   //   </MantineProvider>
//   //   // </UserAuthProvider>
//   // );
// }

//! assumes session exists, ProtectedRoutes checks
// import '@mantine/core/styles.css';
// import { Session } from 'inspector';
// import HomePage from 'pages/Home/Home.page';
// import { useEffect, useState } from 'react';
// import { supabase } from 'supabase/client';

// export default function App() {
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     const getSession = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       console.log('Supabase getSession:', data.session, error);
//       setSession(data.session);
//     };

//     getSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       console.log('Auth State Change:', session);
//       setSession(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);


//   return <HomePage user={session!} />;
// }

import '@mantine/core/styles.css';
import { Session } from '@supabase/supabase-js';
import HomePage from 'pages/Home/Home.page';
import Login from 'pages/Login/Login.page';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from 'supabase/client';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('Supabase getSession:', data.session, error);
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth State Change:', session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return session ? <HomePage /> : <Navigate to="/login" />
}
