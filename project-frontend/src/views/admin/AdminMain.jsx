import {Navigate, useNavigate} from 'react-router';
import {useAdminContext} from '../../hooks/contextHooks';

const AdminMain = () => {
  const {admin} = useAdminContext();
  const navigate = useNavigate();

  return (
    <>
      {!admin && (
        <div>
          <h1>TBA PIZZERIA ADMIN SITE</h1>
          <p>
            Login as an admin by selecting "Login" from the navigation menu{' '}
            <br />
            or by clickin the button bellow.
          </p>
          <button onClick={() => navigate('/admin/login')}>Go to login</button>
        </div>
      )}
      {admin && <Navigate to={'/admin/orders'} />}
    </>
  );
};

export default AdminMain;
