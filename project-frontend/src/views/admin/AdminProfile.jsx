import {useAdminContext} from '../../hooks/contextHooks';

const AdminProfile = () => {
  const {handleAdminLogout} = useAdminContext();

  return (
    <div>
      <div>
        <button onClick={handleAdminLogout}>Logout</button>
      </div>
      <h2>ADMIN PROFILE</h2>
    </div>
  );
};

export default AdminProfile;
