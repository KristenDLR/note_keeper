import { Navigate, Outlet, useLocation } from "react-router-dom";

interface IProtectedRoutesProps {}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (props) => {
  const isAuth: boolean = false;
  const location = useLocation()
  //if isAuth is false naviaget user back to login
  //useLocation hook will track state, which page did the user redirect to the login?
  return isAuth ? (<Outlet />) : (<Navigate to='/login' state ={{ from: location}} />);
};

export default ProtectedRoutes;
