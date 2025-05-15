import { Navigate } from 'react-router-dom';
import { useUserAuth } from 'context/userAuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { session } = useUserAuth();

  // ✅ If already logged in, redirect to home
  if (session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
