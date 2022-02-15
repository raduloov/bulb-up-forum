import { Navigate, Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  isLoggedIn: boolean;
}

const ProtectedRoute = ({ isLoggedIn, ...routeProps }: Props) => {
  if (isLoggedIn) {
    return <Route {...routeProps} />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
