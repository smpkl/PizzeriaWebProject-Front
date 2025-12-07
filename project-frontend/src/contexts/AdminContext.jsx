import {createContext, useState} from 'react';
import {useAuthentication, useAdmin} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';

const AdminContext = createContext(null);

const AdminProvider = ({children}) => {
  const [admin, setAdmin] = useState(null);
  const {postAdminLogin} = useAuthentication();
  const {getCurrentAdmin} = useAdmin();

  const navigate = useNavigate();
  const location = useLocation();

  const handleAdminLogin = async (credentials) => {
    try {
      const adminInfo = await postAdminLogin(credentials);
      setAdmin(adminInfo.user);
      console.log(adminInfo);
      localStorage.setItem('adminToken', adminInfo.token);
      navigate('/admin/orders', {
        state: {success: `Welcome ${adminInfo.user.first_name}!`},
      });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem('adminToken');
      setAdmin(null);
      navigate('/admin');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAdminAutoLogin = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      if (token) {
        const userResponse = await getCurrentAdmin(token);
        console.log(userResponse);
        setAdmin(userResponse.user);
        navigate(location.pathname);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{handleAdminLogin, handleAdminLogout, handleAdminAutoLogin, admin}}
    >
      {children}
    </AdminContext.Provider>
  );
};
export {AdminProvider, AdminContext};
