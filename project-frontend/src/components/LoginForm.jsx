import useForm from '../hooks/formHooks';
import {useState} from 'react';
//import {useUserContext} from '../hooks/contextHooks';

const LoginForm = ({goBack}) => {
  const [error, setError] = useState();
  //const {handleLogin} = useUserContext();

  const initValues = {
    email: '',
    password: '',
  };

  const doLogin = async (formData) => {
    try {
      //await handleLogin(formData);
      console.log(formData);
    } catch (error) {
      console.log('Login error: ' + error);
      setError(error.message);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doLogin, initValues);

  return (
    <>
      {error && <p style={{color: 'darkred'}}>Could not login: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginemail">Email:</label>
          <input
            name="email"
            type="text"
            id="loginemail"
            onChange={handleInputChange}
            autoComplete="email"
            placeholder="Type your email"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password:</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            placeholder="Type your email"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={goBack}>Go Back</button>
    </>
  );
};

export default LoginForm;
