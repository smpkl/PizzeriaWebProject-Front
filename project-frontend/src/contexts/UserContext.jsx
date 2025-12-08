import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postUserLogin} = useAuthentication();
  const {getCurrentUser} = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const userInfo = await postUserLogin(credentials);
      setUser(userInfo.user);
      localStorage.setItem('token', userInfo.token);
      navigate('/', {state: {success: `Welcome ${userInfo.user.first_name}!`}});
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const userResponse = await getCurrentUser(token);
        setUser(userResponse.user);
        navigate(location.pathname);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{handleLogin, handleLogout, handleAutoLogin, user}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
