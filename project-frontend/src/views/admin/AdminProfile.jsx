import {useAdminContext} from '../../hooks/contextHooks';
import {useState} from 'react';
import AdminRegisterForm from '../../components/admin/AdminRegisterForm';
import EditDialog from '../../components/EditDialog';
import '../../admincss/admin.css'

const AdminProfile = () => {
  const {admin} = useAdminContext();
  const [isAdminRegister, setIsAdminRegister] = useState(false);
  const [isEdit, setIsEdit] = useState('');

  const showAdminRegisterForm = () => {
    setIsAdminRegister(true);
  };

  const closeAdminRegister = () => {
    setIsAdminRegister(false);
  };

  const closeEditDialog = () => {
    setIsEdit('');
  };

  const openEditDialog = (type) => {
    setIsEdit(type);
  };

  return (
    <>
      <div className="admin-profile">
        <h2>ADMIN PROFILE</h2>
        {admin && (
          <div className="admin-profile__card">
            <div className="admin-profile__row">
              <div className="admin-profile__left">
                <p>
                  <b>FIRSTNAME &amp; LASTNAME</b>
                </p>
                <p>
                  {admin.first_name} {admin.last_name}
                </p>
              </div>
              <div className="admin-profile__right">
                <button
                  className="admin-button"
                  onClick={() => openEditDialog('name')}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="admin-profile__row">
              <div className="admin-profile__left">
                <p>
                  <b>EMAIL:</b>
                </p>
                <p>{admin.email}</p>
              </div>
              <div className="admin-profile__right">
                <button
                  className="admin-button"
                  onClick={() => openEditDialog('email')}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="admin-profile__row">
              <div className="admin-profile__left">
                <p>
                  <b>PHONENUMBER:</b>
                </p>
                <p>{admin.phonenumber}</p>
              </div>
              <div className="admin-profile__right">
                <button
                  className="admin-button"
                  onClick={() => openEditDialog('phonenumber')}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="admin-profile__row">
              <div className="admin-profile__left">
                <p>
                  <b>ADDRESS:</b>
                </p>
                <p>{admin.address}</p>
              </div>
              <div className="admin-profile__right">
                <button
                  className="admin-button"
                  onClick={() => openEditDialog('address')}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="admin-profile__section">
              <button
                className="admin-button"
                onClick={() => openEditDialog('password')}
              >
                Change password
              </button>
            </div>

            <div className="admin-profile__section">
              <h3>CREATE A NEW ADMIN ACCOUNT</h3>
              <button
                className="admin-button"
                onClick={showAdminRegisterForm}
              >
                Create new account
              </button>
            </div>
          </div>
        )}
      </div>

      {isAdminRegister && (
        <AdminRegisterForm closeDialog={closeAdminRegister} />
      )}
      {isEdit && (
        <EditDialog close={closeEditDialog} type={isEdit} userType={'admin'} />
      )}
    </>
  );
};

export default AdminProfile;
