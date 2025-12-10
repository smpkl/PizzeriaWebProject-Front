import {useEffect, useState} from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import {useUserContext} from '../../hooks/contextHooks';
import {useOrder} from '../../hooks/apiHooks';
import EditDialog from '../../components/EditDialog';

const Profile = () => {
  const {user, handleLogout} = useUserContext();
  const {getOrdersByUserId} = useOrder();
  const [isLogin, setIsLogin] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isEdit, setIsEdit] = useState('');
  const [orders, setOrders] = useState([]);

  const getUserOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const ordersData = await getOrdersByUserId(user.user_id, token);
      setOrders(ordersData);
    } catch (error) {
      console.log(error);
    }
  };

  const closeEditDialog = () => {
    setIsEdit('');
  };

  const openEditDialog = (type) => {
    setIsEdit(type);
  };

  useEffect(() => {
    if (user) {
      getUserOrders();
    }
  }, [user]);

  const returnToSelectMenu = () => {
    setIsForm(false);
  };

  return (
    <>
      {user && (
        <div style={{textAlign: 'right', width: '90%', margin: 'auto'}}>
          <button onClick={handleLogout} className="logout-btn">
            LOGOUT
          </button>
        </div>
      )}
      <h1>PROFILE</h1>
      {user && (
        <>
          <h2
            style={{
              backgroundColor: '#0c2720ff',
              padding: '15px 0',
              color: '#f5eee6',
            }}
          >
            MY INFORMATION
          </h2>
          <div id="user-info-container">
            <div
              id="name-info"
              style={{
                display: 'flex',
                justifyContent: 'left',
                width: '80%',
                margin: 'auto',
                padding: '15px',
                border: '1px solid lightgray',
              }}
            >
              <div>
                <p>
                  <b>FIRSTNAME & LASTNAME: </b>
                </p>
                <p>
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'right',
                  width: '20%',
                  marginLeft: 'auto',
                }}
              >
                <button
                  onClick={() => openEditDialog('name')}
                  className="change-btn"
                >
                  Change
                </button>
              </div>
            </div>
            <div
              id="address-info"
              style={{
                display: 'flex',
                justifyContent: 'left',
                width: '80%',
                margin: 'auto',
                padding: '15px',
                border: '1px solid lightgray',
              }}
            >
              <div style={{textAlign: 'left'}}>
                <p>
                  <b>ADDRESS: </b>
                </p>
                <p>{user.address}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'right',
                  width: '20%',
                  marginLeft: 'auto',
                }}
              >
                <button
                  onClick={() => openEditDialog('address')}
                  className="change-btn"
                >
                  Change
                </button>
              </div>
            </div>
            <div
              id="phone-info"
              style={{
                display: 'flex',
                justifyContent: 'left',
                width: '80%',
                margin: 'auto',
                padding: '15px',
                border: '1px solid lightgray',
              }}
            >
              <div style={{textAlign: 'left'}}>
                <p>
                  <b>PHONENUMBER: </b>
                </p>
                <p>{user.phonenumber}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'right',
                  width: '20%',
                  marginLeft: 'auto',
                }}
              >
                <button
                  onClick={() => openEditDialog('phonenumber')}
                  className="change-btn"
                >
                  Change
                </button>
              </div>
            </div>
            <div
              id="email-info"
              style={{
                display: 'flex',
                justifyContent: 'left',
                width: '80%',
                margin: '10px auto',
                padding: '15px',
                border: '1px solid lightgray',
              }}
            >
              <div style={{textAlign: 'left'}}>
                <p>
                  <b>EMAIL: </b>
                </p>
                <p>{user.email}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'right',
                  width: '20%',
                  marginLeft: 'auto',
                }}
              >
                <button
                  onClick={() => openEditDialog('email')}
                  className="change-btn"
                >
                  Change
                </button>
              </div>
            </div>
            <div style={{margin: 'auto', width: '100%', textAlign: 'center'}}>
              <button
                onClick={() => openEditDialog('password')}
                className="change-btn"
              >
                Change password
              </button>
            </div>
          </div>
          <h2
            style={{
              backgroundColor: '#710009',
              padding: '15px 0',
              color: '#f5eee6',
            }}
          >
            MY ORDERS
          </h2>
          <div id="user-orders-container">
            {!orders && <p>No orders yet</p>}
            {orders && (
              <div>
                {orders.map((o) => {
                  const dateAndTime = o.date_time.split('T');
                  const time = dateAndTime[1].split(':');
                  return (
                    <div
                      key={`user-order-${o.id}`}
                      style={{
                        border: '1px solid #710009',
                        borderRadius: '5px',
                        width: '95%',
                        margin: '10px auto',
                        padding: '0 0 10px 0',
                      }}
                    >
                      <h3
                        style={{
                          width: '95%',
                          textAlign: 'left',
                          margin: '0',
                          backgroundColor: '#710009',
                          borderRadius: '5px 5px 0 0',
                          padding: '10px 0 10px 5%',
                          color: '#f5eee6',
                        }}
                      >
                        ORDER ID: {o.id}
                      </h3>
                      <div
                        style={{display: 'flex', width: '80%', margin: 'auto'}}
                      >
                        <div style={{width: '50%', textAlign: 'left'}}>
                          <p>
                            <b>
                              {dateAndTime[0]} {`${time[0]}:${time[1]}`}
                            </b>
                          </p>
                        </div>
                        <div style={{width: '50%', textAlign: 'right'}}>
                          <p>
                            {' '}
                            <b>TOTAL: </b>
                            {o.price}€
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          width: '80%',
                          margin: 'auto',
                          textAlign: 'left',
                        }}
                      >
                        <p>
                          <b>ORDER TYPE: </b> {o.order_type}
                        </p>
                      </div>
                      <div
                        style={{
                          width: '80%',
                          margin: 'auto',
                          textAlign: 'left',
                        }}
                      >
                        <p>
                          <b>PIZZERIA: </b> {o.pizzeria_address.split(' - ')[0]}
                        </p>
                        <p> {o.pizzeria_address.split(' - ')[1]}</p>
                        {o.order_type === 'Delivery' && (
                          <p>
                            <b>DELIVERY ADDRESS: </b> {o.delivery_address}
                          </p>
                        )}
                      </div>
                      <div>
                        <p
                          style={{
                            textAlign: 'left',
                            width: '80%',
                            margin: '20px auto 5px auto',
                          }}
                        >
                          <b>ITEMS:</b>
                        </p>
                        <div>
                          {o.products.map((p) => {
                            return (
                              <div
                                key={`user-order-product-${p.id}`}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  width: '80%',
                                  margin: 'auto',
                                }}
                              >
                                <div style={{width: '50%', textAlign: 'left'}}>
                                  <p>
                                    <b>{p.name}</b> x{p.quantity}
                                  </p>
                                </div>
                                <div style={{width: '50%', textAlign: 'right'}}>
                                  <p>{p.price}€ / pcs</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <p
                          style={{
                            width: '80%',
                            textAlign: 'left',
                            margin: 'auto',
                          }}
                        >
                          <b>STATUS: </b> {o.status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
      {!user && !isForm && (
        <div id="logged-out-container">
          <h2>NOT LOGGED IN</h2>
          <div>
            <p>Have an account?</p>
            <button
              onClick={() => {
                setIsForm(true);
                setIsLogin(true);
              }}
              className="dark-btn"
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
              className="dark-btn"
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
      {isEdit && (
        <EditDialog close={closeEditDialog} type={isEdit} userType={'user'} />
      )}
    </>
  );
};

export default Profile;
