import {Outlet, Link, useNavigate} from 'react-router';
import {useAdminContext} from '../../hooks/contextHooks';
import {useEffect} from 'react';
import '../../admincss/admin.css'

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
    <div className="admin-root">
      <header className="admin-header">
        <div className="admin-header__logo">
          <img
            src="https://placehold.co/100x100/orange/white?text=LOGO"
            alt="Pizzeria Logo goes here"
          />
        </div>
        <nav className="admin-nav">
          <ul className="admin-nav__list">
            {!admin && (
              <>
                <li className="admin-nav__item">
                  <Link to="/admin">Info</Link>
                </li>
                <li className="admin-nav__item">
                  <Link to="/admin/login">Log In</Link>
                </li>
              </>
            )}
            {admin && (
              <>
                <li className="admin-nav__item">
                  <Link to="/admin/orders">Orders</Link>
                </li>
                <li className="admin-nav__item">
                  <select
                    defaultValue=""
                    onChange={handleAdminSelect}
                    className="admin-nav__select"
                  >
                    <option value="" disabled>
                      Admin pages
                    </option>
                    <option value="/admin/products">Products</option>
                    <option value="/admin/announcements">Announcements</option>
                    <option value="/admin/coupons">Coupons</option>
                    <option value="/admin/meals">Meals</option>
                  </select>
                </li>
                <li className="admin-nav__item">
                  <Link to="/admin/feedbacks">Feedbacks</Link>
                </li>
                <li className="admin-nav__item">
                  <Link to="/admin/profile">Profile</Link>
                  <p className="admin-nav__logout" onClick={handleAdminLogout}>
                    Logout
                  </p>
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
