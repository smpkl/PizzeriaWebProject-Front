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
        <div style={{textAlign: 'right', width: '90%'}}>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      )}
      <h1>PROFILE</h1>
      {user && (
        <>
          <h2
            style={{
              backgroundColor: 'grey',
              padding: '15px 0',
              borderTop: '2px solid black',
            }}
          >
            MY INFORMATION
          </h2>
          <div style={{width: '90%', textAlign: 'left', margin: 'auto'}}>
            <div
              id="name-info"
              style={{
                display: 'flex',
                justifyContent: 'left',
                width: '80%',
                margin: 'auto',
                padding: '10px',
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
                <button onClick={() => openEditDialog('name')}>Change</button>
              </div>
            </div>
            <div
              id="address-info"
              style={{
                display: 'flex',
                justifyContent: 'left',
                width: '80%',
                margin: 'auto',
                padding: '10px',
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
                <button onClick={() => openEditDialog('address')}>
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
                padding: '10px',
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
                <button onClick={() => openEditDialog('phonenumber')}>
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
                margin: 'auto',
                padding: '10px',
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
                <button onClick={() => openEditDialog('email')}>Change</button>
              </div>
            </div>
            <div style={{margin: 'auto', width: '100%', textAlign: 'center'}}>
              <button onClick={() => openEditDialog('password')}>
                Change password
              </button>
            </div>
          </div>
          <h2
            style={{
              backgroundColor: 'grey',
              padding: '15px 0',
              borderTop: '2px solid black',
            }}
          >
            MY ORDERS
          </h2>
          <div>
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
                        border: '1px solid lightgray',
                        width: '95%',
                        margin: '10px auto',
                        padding: '10px 0',
                        backgroundColor: 'ivory',
                      }}
                    >
                      <h3
                        style={{
                          width: '80%',
                          textAlign: 'left',
                          margin: 'auto',
                          padding: '10px',
                          backgroundColor: 'lightgray',
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
        <div>
          <h2>NOT LOGGED IN</h2>
          <div>
            <p>Have an account?</p>
            <button
              onClick={() => {
                setIsForm(true);
                setIsLogin(true);
              }}
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
