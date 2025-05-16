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
