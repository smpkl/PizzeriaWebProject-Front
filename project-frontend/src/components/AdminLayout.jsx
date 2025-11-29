import {Outlet, Link} from 'react-router';

const Layout = () => (
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
          <li>
            <Link to="/admin">admin</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
