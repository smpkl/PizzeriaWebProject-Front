import {useAdminContext} from '../../hooks/contextHooks';
import {useState} from 'react';
import AdminRegisterForm from '../../components/admin/AdminRegisterForm';

const AdminProfile = () => {
  const {admin} = useAdminContext();
  const [isAdminRegister, setIsAdminRegister] = useState(false);

  const showAdminRegisterForm = () => {
    setIsAdminRegister(true);
  };

  const closeAdminRegister = () => {
    setIsAdminRegister(false);
  };

  const profileContentBox = {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    margin: 'auto',
    borderBottom: '2px solid lightgray',
  };
  const contentBoxLeftColumn = {width: '50%', textAlign: 'left'};
  const contentBoxRightColumn = {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'right',
  };

  return (
    <>
      <div>
        <h2>ADMIN PROFILE</h2>
        {admin && (
          <div
            style={{
              border: '2px solid black',
              borderRadius: '5px',
              width: '60%',
              margin: 'auto',
              padding: '10px',
            }}
          >
            <div style={profileContentBox}>
              <div style={contentBoxLeftColumn}>
                <p>
                  <b>FIRSTNAME & LASTNAME</b>
                </p>
                <p>
                  {admin.first_name} {admin.last_name}
                </p>
              </div>
              <div style={contentBoxRightColumn}>
                <button>Change</button>
              </div>
            </div>
            <div style={profileContentBox}>
              <div style={contentBoxLeftColumn}>
                <p>
                  <b>EMAIL:</b>
                </p>
                <p>{admin.email}</p>
              </div>
              <div style={contentBoxRightColumn}>
                <button>Change</button>
              </div>
            </div>
            <div style={profileContentBox}>
              <div style={contentBoxLeftColumn}>
                <p>
                  <b>PHONENUMBER:</b>
                </p>
                <p>{admin.phonenumber}</p>
              </div>
              <div style={contentBoxRightColumn}>
                <button>Change</button>
              </div>
            </div>
            <div style={profileContentBox}>
              <div style={contentBoxLeftColumn}>
                <p>
                  <b>ADDRESS:</b>
                </p>
                <p>{admin.address}</p>
              </div>
              <div style={contentBoxRightColumn}>
                <button>Change</button>
              </div>
            </div>
            <div style={{padding: '20px 0'}}>
              <button>Change password</button>
            </div>
            <div style={{padding: '20px 0'}}>
              <h3>CREATE A NEW ADMIN ACCOUNT</h3>
              <button onClick={showAdminRegisterForm}>
                Create new account
              </button>
            </div>
          </div>
        )}
      </div>
      {isAdminRegister && (
        <AdminRegisterForm closeDialog={closeAdminRegister} />
      )}
    </>
  );
};

export default AdminProfile;
