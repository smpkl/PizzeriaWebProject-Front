import useForm from '../../hooks/formHooks';
import {useAdminContext} from '../../hooks/contextHooks';
import {useState} from 'react';

const AdminLoginForm = () => {
  const [error, setError] = useState();
  const {handleAdminLogin} = useAdminContext();

  const initValues = {
    email: '',
    password: '',
  };

  const doAdminLogin = async (formData) => {
    try {
      const loginResponse = await handleAdminLogin(formData);
      console.log(loginResponse);
    } catch (error) {
      console.log('Login error: ' + error);
      setError(error.message);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doAdminLogin, initValues);

  return (
    <>
      <h2>ADMIN LOGIN</h2>
      {error && <p style={{color: 'darkred'}}>Could not login: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="adminlogin-email">Email:</label>
          <input
            name="email"
            type="text"
            id="adminlogin-email"
            onChange={handleInputChange}
            autoComplete="email"
            placeholder="Type your email"
          />
        </div>
        <div>
          <label htmlFor="adminlogin-password">Password:</label>
          <input
            name="password"
            type="password"
            id="adminlogin-password"
            onChange={handleInputChange}
            autoComplete="current-password"
            placeholder="Type your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default AdminLoginForm;
