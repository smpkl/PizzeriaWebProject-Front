import {Navigate, useNavigate} from 'react-router';
import {useAdminContext} from '../../hooks/contextHooks';
import '../../admincss/admin.css';

const AdminMain = () => {
  const {admin} = useAdminContext();
  const navigate = useNavigate();

  return (
    <div className="admin-main">
      {!admin && (
        <div className="admin-card admin-main__hero">
          <h1 className="admin-main__title">TBA PIZZERIA ADMIN SITE</h1>
          <p className="admin-main__text">
            Login as an admin by selecting &quot;Login&quot; from the navigation
            menu <br />
            or by clicking the button below.
          </p>
          <button
            className="admin-button admin-main__button"
            onClick={() => navigate('/admin/login')}
          >
            Go to login
          </button>
        </div>
      )}
      {admin && <Navigate to={'/admin/orders'} />}
    </div>
  );
};

export default AdminMain;
