import { Navigate, Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { useUserAuth } from "context/userAuthContext";
import { Note } from "types";

export interface IProtectedRoutesProps {
  notes?: Note[];
}

export const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = ({ notes }) => {
  const { user } = useUserAuth();
  const location = useLocation();
  const { id } = useParams();
  const note = notes?.find(n => n.id === id);

  console.log('user', user);
  //If the user is not authenticated, they are redirected to /login and their intended location is stored in the state
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // //If the user is authenticated but the note does not exist, they are redirected to /.
  // if (id && !note) {
  //   return <Navigate to="/" replace />;
  // }

  //If both conditions pass, the component renders the Outlet, passing the note via context.
  return <Outlet context={note} />;
};

export function useNote() {
  return useOutletContext<Note>();
};
