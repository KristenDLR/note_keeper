import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from 'supabase/client';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        console.log("Session restored after redirect:", data.session);
        navigate('/');
      } else {
        console.error("Session not found after redirect:", error);
      }
    };
    handleCallback();
  }, [navigate]);

  return <p>Logging in...</p>;
}
