import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';
import {useAdminContext, useUserContext} from '../hooks/contextHooks';

const EditDialog = ({close, type, userType}) => {
  const {user} = useUserContext();
  const {admin} = useAdminContext();
  const [error, setError] = useState();
  const [message, setMessage] = useState('');
  const {putUser} = useUser();

  const initValues = {
    firstname: userType === 'admin' ? admin.first_name : user.first_name,
    lastname: userType === 'admin' ? admin.last_name : user.last_name,
    password: '',
    email: userType === 'admin' ? admin.email : user.email,
    phonenumber: userType === 'admin' ? admin.phonenumber : user.phonenumber,
    address: userType === 'admin' ? admin.address : user.address,
  };

  const doUserUpdate = async (formData) => {
    try {
      const token =
        userType === 'admin'
          ? localStorage.getItem('adminToken')
          : localStorage.getItem('token');
      const userId = userType === 'admin' ? admin.user_id : user.user_id;
      const userInfo = await putUser(formData, token, userId);
      setError('');
      setMessage('User information updated');
    } catch (error) {
      console.log('Update error: ', error);
      setError(error.message);
    }
  };

  const {handleInputChange, handleSubmit, inputs} = useForm(
    doUserUpdate,
    initValues,
  );

  return (
    <>
      <dialog
        open
        style={{
          margin: '0',
          padding: '0',
          border: 'none',
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
        <div className="editDialog-container">
          <h2>USER UPDATE</h2>
          {message && <p style={{color: 'darkgreen'}}>{message}</p>}
          {error && (
            <p style={{color: 'darkred'}}>Could not register: {error}</p>
          )}
          <form
            className="edit-form"
            onSubmit={handleSubmit}
            style={{width: '90%', margin: 'auto'}}
          >
            {type === 'name' && (
              <>
                <div>
                  <label
                    htmlFor="useredit-firstname"
                    className="edit-dialog-label"
                  >
                    Firstname:
                  </label>
                  <input
                    className="edit-dialog-input"
                    name="firstname"
                    type="text"
                    id="useredit-firstname"
                    onChange={handleInputChange}
                    autoComplete="firstname"
                    value={inputs.firstname}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="useredit-lastname"
                    className="edit-dialog-label"
                  >
                    Lastname:
                  </label>
                  <input
                    className="edit-dialog-input"
                    name="lastname"
                    type="text"
                    id="useredit-lastname"
                    onChange={handleInputChange}
                    autoComplete="lastname"
                    value={inputs.lastname}
                    required
                  />
                </div>
              </>
            )}
            {type === 'address' && (
              <div>
                <label htmlFor="useredit-address" className="edit-dialog-label">
                  Address (street name and number, postal code, city):
                </label>
                <input
                  className="edit-dialog-input"
                  name="address"
                  type="text"
                  id="useredit-address"
                  onChange={handleInputChange}
                  autoComplete="address"
                  value={inputs.address}
                  required
                />
              </div>
            )}
            {type === 'phonenumber' && (
              <div>
                <label
                  htmlFor="useredit-phonenumber"
                  className="edit-dialog-label"
                >
                  Phonenumber:
                </label>
                <input
                  className="edit-dialog-input"
                  name="phonenumber"
                  type="number"
                  id="useredit-phonenumber"
                  onChange={handleInputChange}
                  autoComplete="phonenumber"
                  value={inputs.phonenumber}
                  required
                />
              </div>
            )}
            {type === 'email' && (
              <div>
                <label htmlFor="useredit-email" className="edit-dialog-label">
                  Email:
                </label>
                <input
                  className="edit-dialog-input"
                  name="email"
                  type="text"
                  id="useredit-email"
                  onChange={handleInputChange}
                  autoComplete="email"
                  value={inputs.email}
                  required
                />
              </div>
            )}
            {type === 'password' && (
              <div>
                <label
                  htmlFor="useredit-password"
                  className="edit-dialog-label"
                >
                  Password:
                </label>
                <input
                  className="edit-dialog-input"
                  name="password"
                  type="password"
                  id="useredit-password"
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  placeholder="Type new password"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              style={{marginBottom: '20px'}}
              className="checkout-btn"
            >
              Update
            </button>
          </form>
          <button onClick={close} className="change-btn">
            Go Back
          </button>
        </div>
      </dialog>
    </>
  );
};

export default EditDialog;
