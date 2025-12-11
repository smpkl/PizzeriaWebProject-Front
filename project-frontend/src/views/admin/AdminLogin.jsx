import AdminLoginForm from '../../components/admin/AdminLoginForm';
import '../../admincss/admin.css';

const AdminLogin = () => {
  return (
    <div className="admin-login-page">
      <div className="admin-card admin-login-card">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
