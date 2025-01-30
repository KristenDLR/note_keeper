import { useUserAuth } from "context/userAuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface IProtectedRoutesProps {}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (props) => {
  const { user } = useUserAuth()
  const location = useLocation()
  //if isAuth is false naviaget user back to login
  //useLocation hook will track state, which page did the user redirect to the login?
  return user ? (<Outlet />) : (<Navigate to='/login' state ={{ from: location}} />);
};

export default ProtectedRoutes;
