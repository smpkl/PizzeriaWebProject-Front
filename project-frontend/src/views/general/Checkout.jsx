import {useNavigate, Navigate} from 'react-router';
import {useOrderContext} from '../../hooks/contextHooks';
import {useOrder} from '../../hooks/apiHooks';
import {useEffect, useState} from 'react';

const CheckOut = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);

  const {postOrder} = useOrder();
  const {
    orderInfo,
    orderType,
    orderUserId,
    orderProducts,
    orderMeals,
    orderPrice,
    resetOrderContext,
    isActiveOrder,
  } = useOrderContext();

  useEffect(() => {
    setOrderId(null);
    if (!isActiveOrder) navigate('/');
  }, []);

  const doCheckout = async (event) => {
    try {
      event.preventDefault();
      const response = await postOrder(
        orderInfo,
        orderType,
        orderUserId,
        orderProducts,
        orderMeals,
        orderPrice,
      );
      setOrderId(response);
      resetOrderContext();
    } catch (error) {
      console.log(error);
      navigate('/order', {state: {error}});
    }
  };

  return (
    <>
      {!orderId && isActiveOrder && (
        <div>
          <h1>CHECKOUT</h1>
          <p>Chech Your order details down below before checking out</p>
          <div style={{textAlign: 'center'}}>
            <h2>ORDER TYPE: {orderType}</h2>
            <div
              style={{
                display: 'flex',
                margin: 'auto',
                justifyContent: 'center',
              }}
            >
              <div style={{marginRight: '10px'}}>
                <p>FROM:</p>
                <p>{orderInfo.pizzeriaAddress}</p>
              </div>
              {orderType === 'Delivery' && (
                <div style={{marginLeft: '10px'}}>
                  <p>TO:</p>
                  <p>
                    {orderInfo.userAddress} {orderInfo.userAddress2}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div style={{backgroundColor: 'gray'}}>
            {orderType === 'delivery' && <h2>DELIVERY TIME: </h2>}
            {orderType === 'pick-up' && <h2>PICK UP TIME: </h2>}
            {orderType === 'atPizzeria' && <h2>READY AT: </h2>}
            <div
              style={{
                display: 'flex',
                margin: 'auto',
                justifyContent: 'center',
              }}
            >
              <p style={{marginRight: '10px'}}>
                <b>AT: </b> {orderInfo.time}
              </p>
              <p style={{marginLeft: '10px'}}>
                <b>ON: </b> {orderInfo.day}
              </p>
            </div>
          </div>
          <div>
            <h2>CONTACS: </h2>
            <div>
              <p>
                <b>FIRSTNAME & LASTNAME:</b>
              </p>
              <p>{orderInfo.name}</p>
              <p>
                <b>EMAIL:</b>
              </p>
              <p>{orderInfo.email}</p>
              <p>
                <b>PHONENUMBER:</b>
              </p>
              <p>{orderInfo.phonenumber}</p>
            </div>
          </div>
          {orderInfo.details && (
            <div
              style={{backgroundColor: 'lightgray', border: '1px solid black'}}
            >
              <h2>
                ORDER DETAILS
                <br />
                FOR THE PIZZERIA:
              </h2>
              <p
                style={{
                  backgroundColor: 'white',
                  width: '90%',
                  minHeight: '20px',
                  margin: 'auto',
                }}
              >
                {orderInfo.details}
              </p>
            </div>
          )}
          <div>
            <h2>ITEMS:</h2>
            <div>
              {orderProducts.map((p) => (
                <div
                  key={`choP-${p.product.id}`}
                  style={{
                    display: 'flex',
                    margin: 'auto',
                    justifyContent: 'center',
                    border: '1px solid black',
                  }}
                >
                  <div>
                    <img
                      src={
                        p.product.filename
                          ? `http://127.0.0.1:3000/api/v1/uploads/${p.product.filename}`
                          : 'https://placehold.co/120x120/green/white?text=PRODUCT'
                      }
                      alt={`Product ${p.product.name}`}
                      style={{width: '90px'}}
                    />
                  </div>
                  <div style={{textAlign: 'left', marginLeft: '20px'}}>
                    <p>
                      <b>{p.product.name}</b> - {p.quantity} pcs
                    </p>
                    <p>
                      {p.product.price}€ x {p.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {orderMeals.map((m) => (
                <div
                  key={`choM-${m.meal.id}`}
                  style={{
                    display: 'flex',
                    margin: 'auto',
                    justifyContent: 'center',
                    border: '1px solid black',
                  }}
                >
                  <div>
                    <img
                      src={
                        m.meal.filename
                          ? `http://127.0.0.1:3000/api/v1/uploads/${m.meal.filename}`
                          : 'https://placehold.co/120x120/green/white?text=PRODUCT'
                      }
                      alt={`Product ${m.meal.name}`}
                      style={{width: '90px'}}
                    />
                  </div>
                  <div style={{textAlign: 'left', marginLeft: '20px'}}>
                    <p>
                      <b>{m.meal.name}</b> - {m.quantity} pcs
                    </p>
                    <p>
                      {m.meal.price}€ x {m.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p>ITEMS: {orderPrice.toFixed(2)}€</p>
            <p>DELIVERY: {Number(orderInfo.deliveryFee).toFixed(2)}€</p>
            <p style={{fontSize: '18px'}}>
              <b>TOTAL: </b>
              {(orderPrice + Number(orderInfo.deliveryFee)).toFixed(2)}€
            </p>
          </div>
          <div>
            <form
              onSubmit={doCheckout}
              style={{display: 'flex', flexDirection: 'column', margin: 'auto'}}
            >
              <label htmlFor="coupon-input">DISCOUNT COUPON: </label>
              <input
                type="text"
                name="coupon"
                id="coupon-input"
                placeholder="Give discount coupon"
                style={{margin: 'auto'}}
              />
              <label htmlFor="payment-type">SELECT PAYMENT METHOD: </label>
              <select
                name="payment-type"
                id="payment-type"
                style={{margin: 'auto'}}
              >
                <option value="bill">Klarna</option>
                <option value="creditcard">Card</option>
                <option value="at-pickup">At pickup</option>
                <option value="bank">Online bank</option>
              </select>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 'auto',
                }}
              >
                <button type="submit" style={{margin: 'auto'}}>
                  ORDER
                </button>
              </div>
            </form>
            <button onClick={() => navigate('/order')} style={{margin: 'auto'}}>
              EDIT ORDER
            </button>
          </div>
        </div>
      )}
      {orderId && (
        <div>
          <h1>ORDER PLACED</h1>
          <p>
            Your order number: <b>{orderId}</b>
          </p>
          <p>
            Logged in users can check their order's progress through profile
            page. <br />
            All customers will be send a notice through email and phone when
            order is ready.
          </p>
          <button onClick={() => navigate('/')}>Return to main page</button>
        </div>
      )}
    </>
  );
};

export default CheckOut;
