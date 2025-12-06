import {useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';

const RegisterForm = ({goBack}) => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const {postUser} = useUser();

  const initValues = {
    firstame: '',
    lastname: '',
    password: '',
    email: '',
    address: '',
  };

  const doRegister = async (formData) => {
    try {
      const userInfo = await postUser(formData);
      setError('');
      console.log(userInfo);
      navigate('/', {
        state: {
          success: `New user registered! 
          Login by selecting "Login" from the navigation menu.`,
        },
      });
    } catch (error) {
      console.log('Register error: ', error);
      setError(error.message);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doRegister, initValues);

  return (
    <>
      <h2>REGISTER</h2>
      {error && <p style={{color: 'darkred'}}>Could not register: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registerfirstname">Firstname:</label>
          <input
            name="firstname"
            type="text"
            id="registerfirstname"
            onChange={handleInputChange}
            autoComplete="firstname"
            placeholder="Type firstname"
          />
        </div>
        <div>
          <label htmlFor="registerlastname">Lastname:</label>
          <input
            name="lastname"
            type="text"
            id="registerlastname"
            onChange={handleInputChange}
            autoComplete="lastname"
            placeholder="Type lastname"
          />
        </div>
        <div>
          <label htmlFor="registeraddress">
            Address (street name and number, postal code, city):
          </label>
          <input
            name="address"
            type="text"
            id="registeraddress"
            onChange={handleInputChange}
            autoComplete="address"
            placeholder="Type streetname and -number, postal code and city"
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email:</label>
          <input
            name="email"
            type="text"
            id="registernemail"
            onChange={handleInputChange}
            autoComplete="email"
            placeholder="Type email"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password:</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            placeholder="Type password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={goBack}>Go Back</button>
    </>
  );
};

export default RegisterForm;
