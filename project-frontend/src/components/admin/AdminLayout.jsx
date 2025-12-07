import {Outlet, Link, useNavigate} from 'react-router';
import {useAdminContext} from '../../hooks/contextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const navigate = useNavigate();

  const {admin, handleAdminAutoLogin, handleAdminLogout} = useAdminContext();

  useEffect(() => {
    handleAdminAutoLogin();
  }, []);

  const handleAdminSelect = (evt) => {
    const path = evt.target.value;
    if (path) {
      navigate(path);
    }
  };
  return (
    <div>
      <header style={{display: 'flex', backgroundColor: 'lightgray'}}>
        <div style={{width: '30%'}}>
          <img
            src="https://placehold.co/100x100/orange/white?text=LOGO"
            alt="Pizzeria Logo goes here"
          />
        </div>
        <nav>
          <ul style={{display: 'flex', margin: '0', padding: '0'}}>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!admin && (
              <>
                <li>
                  <Link to="/admin">Info</Link>
                </li>
                <li>
                  <Link to="/admin/login">Log In</Link>
                </li>
              </>
            )}
            {admin && (
              <>
                <li>
                  <Link to="/admin/orders">Orders</Link>
                </li>
                <li>
                  <select defaultValue="" onChange={handleAdminSelect}>
                    <option value="" disabled>
                      Admin pages
                    </option>
                    <option value="/admin/products">Products</option>
                    <option value="/admin/announcements">Announcements</option>
                    <option value="/admin/coupons">Coupons</option>
                    <option value="/admin/meals">Meals</option>
                  </select>
                </li>
                {/* Odottaa että valmistuu ja linkitetää projektii */}
                <li>
                  <Link to="/admin/feedbacks">Feedbacks</Link>
                </li>
                <li>
                  <Link to="/admin/profile">Profile</Link>
                  <p onClick={handleAdminLogout}>Logout</p>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
