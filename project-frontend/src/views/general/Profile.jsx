import {useState} from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

const Profile = () => {
  //const { user } = useUserContext();
  const user = false;
  const [isLogin, setIsLogin] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const returnToSelectMenu = () => {
    setIsForm(false);
  };

  return (
    <>
      <h1>PROFILE</h1>
      {user && (
        <div>
          <h2>USER INFORMATION</h2>
        </div>
      )}
      {!user && !isForm && (
        <div>
          <h2>NOT LOGGED IN</h2>
          <div>
            <p>Have an account?</p>
            <button
              onClick={() => {
                setIsForm(true);
                setIsLogin(true);
              }}
            >
              LOGIN
            </button>
          </div>
          <div>
            <p>Not yet a member?</p>
            <button
              onClick={() => {
                setIsForm(true);
                setIsLogin(false);
              }}
            >
              REGISTER
            </button>
          </div>
        </div>
      )}
      {!user && isForm && isLogin && <LoginForm goBack={returnToSelectMenu} />}
      {!user && isForm && !isLogin && (
        <RegisterForm goBack={returnToSelectMenu} />
      )}
    </>
  );
};

export default Profile;
