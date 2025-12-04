// Jokaisessa näkymässä oleva runko (header ja footer)

import {Outlet, Link} from 'react-router';
import {useOrderContext} from '../hooks/contextHooks';
import {useEffect, useState} from 'react';

const Layout = () => {
  const [itemCount, setItemCount] = useState();
  const {orderProducts, orderMeals} = useOrderContext();

  useEffect(() => {
    let count = 0;
    if (orderProducts) orderProducts.forEach((p) => (count += p.quantity));
    if (orderMeals) orderMeals.forEach((m) => (count += m.quantity));
    setItemCount(count);
    //console.log(itemCount);
  }, [orderProducts, orderMeals]);

  return (
    <div>
      <header
        style={{
          display: 'flex',
          backgroundColor: 'lightgray',
          position: 'sticky',
          top: '0',
        }}
      >
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
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/order">
                Order
                {itemCount > 0 ? (
                  <div style={{backgroundColor: 'limegreen'}}>
                    <p>{itemCount}</p>
                  </div>
                ) : (
                  ''
                )}
              </Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer style={{backgroundColor: 'bisque'}}>
        <h3 style={{margin: '5px auto'}}>PIZZERIA TBA</h3>
        <ul style={{margin: '0', padding: '0'}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/order">Order</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
        <p style={{margin: '5px auto'}}>xxxxxxxxxxxxxxxxx</p>
        <p style={{margin: '5px auto'}}>xxxxxxxxx</p>
        <p style={{margin: '5px auto'}}></p>
        <p>Copyright & Stuff</p>
      </footer>
    </div>
  );
};

export default Layout;
