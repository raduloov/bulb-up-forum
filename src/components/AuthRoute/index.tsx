import { auth } from '../../config/firebase';
import { Navigate } from 'react-router-dom';

export interface AuthRouteProps {}

const AuthRoute: React.FC<AuthRouteProps> = props => {
  const { children } = props;

  if (!auth.currentUser) {
    return <Navigate replace to="/login" />;
  }

  return <div>{children}</div>;
};

export default AuthRoute;
