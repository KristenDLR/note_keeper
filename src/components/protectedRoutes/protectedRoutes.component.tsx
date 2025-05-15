// 

//Modify ProtectedRoutes to render App.tsx once a session is confirmed

import { useUserAuth } from "context/userAuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import App from 'App';

const ProtectedRoutes: React.FunctionComponent = () => {
  const { session } = useUserAuth();
  const location = useLocation();
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

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Otherwise render your main app layout
  // return (
  //   <>
  //     <App /> //your main app shell (auth session-aware logic, like HomePage)
  //     <Outlet /> //whatever child route is matched (e.g. /profile, /new)
  //   </>
  return session ? <Outlet /> : <Navigate to="/login" replace />;
  // );
};

export default ProtectedRoutes;
