import {Navigate} from 'react-router';
import {useAdminContext} from '../hooks/contextHooks';

const ProtectedRoute = ({children}) => {
  const {admin} = useAdminContext();

  if (!admin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
