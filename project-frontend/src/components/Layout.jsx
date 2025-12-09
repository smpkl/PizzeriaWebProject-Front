import {Outlet, Link} from 'react-router';
import {useOrderContext} from '../hooks/contextHooks';
import {useEffect, useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';

import {AiOutlineShopping} from 'react-icons/ai';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlineLogin} from 'react-icons/ai';

const Layout = () => {
  const [itemCount, setItemCount] = useState();
  const {orderProducts, orderMeals} = useOrderContext();

  const {handleAutoLogin, user} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

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
          backgroundColor: '#0c2720ff',
          position: 'sticky',
          top: '0',
        }}
      >
        <div style={{margin: '2%'}}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
            }}
          >
            <img
              src="https://placehold.co/80x80/white/green?text=LOGO"
              alt="Pizzeria Logo goes here"
            />
          </Link>
        </div>
        <nav
          style={{
            display: 'flex',
            margin: '0',
            padding: '0',
            alignItems: 'center',
            justifyContent: 'right',
            width: '75%',
          }}
        >
          <ul
            id="nav-menu"
            style={{
              display: 'flex',
              justifyContent: 'right',
              margin: '0',
              padding: '0',
              width: '100%',
            }}
          >
            <li>
              <Link to="/profile">
                {user ? (
                  <AiOutlineUser style={{fontSize: '35px'}} />
                ) : (
                  <AiOutlineLogin style={{fontSize: '35px'}} />
                )}
              </Link>
            </li>
            <li>
              <Link to="/order" style={{position: 'relative'}}>
                <AiOutlineShopping style={{fontSize: '35px'}} />
                {itemCount > 0 ? (
                  <div
                    style={{
                      backgroundColor: '#ecb640ff',
                      color: '#F5EEE6',
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '-18px',
                      right: '-18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                    }}
                  >
                    <p>{itemCount}</p>
                  </div>
                ) : (
                  ''
                )}
              </Link>
            </li>
            <li>
              <Link to="/about">
                <AiOutlineInfoCircle style={{fontSize: '35px'}} />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer
        style={{
          backgroundColor: '#710009',
          margin: '0',
          padding: '10px 0',
          color: '#F5EEE6',
        }}
      >
        <h3 style={{margin: '5px auto', color: '#ecb640ff'}}>PIZZERIA TBA</h3>
        <ul style={{margin: '0 0 10px 0', padding: '0'}}>
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
        <p style={{margin: '1px auto', fontSize: '10px'}}>xxxxxxxxxxxxxxxxx</p>
        <p style={{margin: '1px auto', fontSize: '10px'}}>xxxxxxxxx</p>
        <p style={{margin: '1px auto', fontSize: '10px'}}></p>
        <p style={{margin: '1px auto', fontSize: '10px'}}>Copyright & Stuff</p>
      </footer>
    </div>
  );
};

export default Layout;
