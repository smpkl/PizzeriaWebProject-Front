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
      await handleAdminLogin(formData);
    } catch (error) {
      console.log('Login error: ' + error);
      setError(error.message);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(
    doAdminLogin,
    initValues,
  );

  return (
    <div className="admin-login-form">
      <h2 className="admin-login-form__title">ADMIN LOGIN</h2>

      {error && (
        <p className="admin-login-form__error">
          Could not login: {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-field">
          <label
            className="admin-label"
            htmlFor="adminlogin-email"
          >
            Email:
          </label>
          <input
            className="admin-input"
            name="email"
            type="text"
            id="adminlogin-email"
            onChange={handleInputChange}
            autoComplete="email"
            placeholder="Type your email"
          />
        </div>

        <div className="admin-field">
          <label
            className="admin-label"
            htmlFor="adminlogin-password"
          >
            Password:
          </label>
          <input
            className="admin-input"
            name="password"
            type="password"
            id="adminlogin-password"
            onChange={handleInputChange}
            autoComplete="current-password"
            placeholder="Type your password"
          />
        </div>

        <button
          type="submit"
          className="admin-button admin-login-form__button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
