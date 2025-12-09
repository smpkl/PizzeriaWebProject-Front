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
    phonenumber: '',
    address: '',
  };

  const doRegister = async (formData) => {
    try {
      const userInfo = await postUser(formData);
      setError('');
      //console.log(userInfo);
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
      <form onSubmit={handleSubmit} className="login-and-register-form">
        <div>
          <label
            htmlFor="registerfirstname"
            className="login-and-register-label"
          >
            Firstname:
          </label>
          <input
            className="login-and-register-input"
            name="firstname"
            type="text"
            id="registerfirstname"
            onChange={handleInputChange}
            autoComplete="firstname"
            placeholder="Type firstname"
            required
          />
        </div>
        <div>
          <label
            htmlFor="registerlastname"
            className="login-and-register-label"
          >
            Lastname:
          </label>
          <input
            className="login-and-register-input"
            name="lastname"
            type="text"
            id="registerlastname"
            onChange={handleInputChange}
            autoComplete="lastname"
            placeholder="Type lastname"
            required
          />
        </div>
        <div>
          <label htmlFor="registeraddress" className="login-and-register-label">
            Address (street name and number, postal code, city):
          </label>
          <input
            className="login-and-register-input"
            name="address"
            type="text"
            id="registeraddress"
            onChange={handleInputChange}
            autoComplete="address"
            placeholder="Type streetname and -number, postal code and city"
            required
          />
        </div>
        <div>
          <label
            htmlFor="registerphonenumber"
            className="login-and-register-label"
          >
            Phonenumber:
          </label>
          <input
            className="login-and-register-input"
            name="phonenumber"
            type="number"
            id="registerphonenumber"
            onChange={handleInputChange}
            autoComplete="phonenumber"
            placeholder="Type phonenumber"
            required
          />
        </div>
        <div>
          <label htmlFor="registeremail" className="login-and-register-label">
            Email:
          </label>
          <input
            className="login-and-register-input"
            name="email"
            type="text"
            id="registernemail"
            onChange={handleInputChange}
            autoComplete="email"
            placeholder="Type email"
            required
          />
        </div>
        <div>
          <label
            htmlFor="registerpassword"
            className="login-and-register-label"
          >
            Password:
          </label>
          <input
            className="login-and-register-input"
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            placeholder="Type password"
            required
          />
        </div>
        <button type="submit" className="login-and-register-button">
          Register
        </button>
      </form>
      <button onClick={goBack} className="go-back-btn">
        Go Back
      </button>
    </>
  );
};

export default RegisterForm;
