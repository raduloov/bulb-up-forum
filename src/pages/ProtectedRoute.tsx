import { RouteProps, Outlet, Navigate } from 'react-router-dom';

interface Props extends RouteProps {
  isLoggedIn: boolean;
}

const ProtectedRoute = (props: Props) => {
  return props.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
