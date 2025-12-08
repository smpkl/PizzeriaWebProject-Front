import {useState} from 'react';
import useForm from '../../hooks/formHooks';
import {useAdmin} from '../../hooks/apiHooks';

const AdminRegisterForm = ({closeDialog}) => {
  const [error, setError] = useState();
  const [message, setMessage] = useState('');
  const {postAdmin} = useAdmin();

  const initValues = {
    firstame: '',
    lastname: '',
    password: '',
    email: '',
    phonenumber: '',
    address: '',
  };

  const inputContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    textAlign: 'left',
    width: '40%',
    margin: '20px auto',
  };

  const doAdminRegister = async (formData) => {
    try {
      const userInfo = await postAdmin(formData);
      setError('');
      console.log(userInfo);
      setMessage('New admin registered!');
    } catch (error) {
      console.log('Register error: ', error);
      setError(error.message);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(
    doAdminRegister,
    initValues,
  );

  return (
    <>
      <dialog
        open
        style={{
          margin: '0',
          position: 'fixed',
          inset: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'rgba(20, 17, 14, 0.75)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          style={{
            backgroundColor: 'whitesmoke',
            width: '60%',
            margin: 'auto',
            padding: '20px 10px',
          }}
        >
          <h2>ADMIN REGISTER</h2>
          {message && <p style={{color: 'darkgreen'}}>{message}</p>}
          {error && (
            <p style={{color: 'darkred'}}>Could not register: {error}</p>
          )}
          <form onSubmit={handleSubmit} style={{backgroundColor: 'whitesmoke'}}>
            <div style={inputContainer}>
              <label htmlFor="adminregister-firstname">Firstname:</label>
              <input
                name="firstname"
                type="text"
                id="adminregister-firstname"
                onChange={handleInputChange}
                autoComplete="firstname"
                placeholder="Type firstname"
                required
              />
            </div>
            <div style={inputContainer}>
              <label htmlFor="adminregister-lastname">Lastname:</label>
              <input
                name="lastname"
                type="text"
                id="adminregister-lastname"
                onChange={handleInputChange}
                autoComplete="lastname"
                placeholder="Type lastname"
                required
              />
            </div>
            <div style={inputContainer}>
              <label htmlFor="adminregister-address">
                Address (street name and number, postal code, city):
              </label>
              <input
                name="address"
                type="text"
                id="adminregister-address"
                onChange={handleInputChange}
                autoComplete="address"
                placeholder="Type streetname and -number, postal code and city"
                required
              />
            </div>
            <div style={inputContainer}>
              <label htmlFor="adminregister-phonenumber">Phonenumber:</label>
              <input
                name="phonenumber"
                type="number"
                id="adminregister-phonenumber"
                onChange={handleInputChange}
                autoComplete="phonenumber"
                placeholder="Type phonenumber"
                required
              />
            </div>
            <div style={inputContainer}>
              <label htmlFor="adminregister-email">Email:</label>
              <input
                name="email"
                type="text"
                id="registernemail"
                onChange={handleInputChange}
                autoComplete="email"
                placeholder="Type email"
                required
              />
            </div>
            <div style={inputContainer}>
              <label htmlFor="adminregister-password">Password:</label>
              <input
                name="password"
                type="password"
                id="registerpassword"
                onChange={handleInputChange}
                autoComplete="current-password"
                placeholder="Type password"
                required
              />
            </div>
            <button type="submit" style={{marginBottom: '20px'}}>
              Register
            </button>
          </form>
          <button onClick={closeDialog}>Go Back</button>
        </div>
      </dialog>
    </>
  );
};

export default AdminRegisterForm;
