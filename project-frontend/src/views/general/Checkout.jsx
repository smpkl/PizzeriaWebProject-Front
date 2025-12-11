import {useNavigate, Navigate} from 'react-router';
import {useOrderContext} from '../../hooks/contextHooks';
import {useCoupons, useOrder} from '../../hooks/apiHooks';
import {useEffect, useState} from 'react';

const CheckOut = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const {getCouponByCode} = useCoupons();

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

  useEffect(() => {
    if (!coupon) {
      setDiscountPercent(0);
      return;
    }

    //debounce time for coupon search
    const timeoutId = setTimeout(() => {
      validateCoupon(coupon);
    }, 500);

    const validateCoupon = async (userCoupon) => {
      const couponFound = await getCouponByCode(userCoupon);

      if (!couponFound) {
        setDiscountPercent(0);
        return;
      }

      const discountPercentMultiplier =
        Number(couponFound.discount_percentage) / 100 || 0;
      setDiscountPercent(discountPercentMultiplier);
    };

    return () => clearTimeout(timeoutId);
  }, [coupon]);

  const doCheckout = async (event) => {
    try {
      event.preventDefault();
      const response = await postOrder(
        orderInfo,
        orderType,
        orderUserId ?? null,
        orderProducts,
        orderMeals,
        total,
      );
      setOrderId(response);
      resetOrderContext();
    } catch (error) {
      console.log(error);
      navigate('/order', {state: {error}});
    }
  };

  const discountMultiplier = discountPercent || 0;
  const discountedItemsPrice = orderPrice * (1 - discountMultiplier);
  const deliveryFee = Number(orderInfo.deliveryFee) || 0;
  const total = discountedItemsPrice + deliveryFee;

  return (
    <>
      {!orderId && isActiveOrder && (
        <div id="checkout-container">
          <h1>CHECKOUT</h1>
          <p>
            Check Your order details down below <br />
            before checking out
          </p>
          <div style={{textAlign: 'center'}}>
            <h2>ORDER TYPE: {orderType}</h2>
            <div
              id="addressAndTime-box"
              style={{
                display: 'flex',
                margin: 'auto',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#ecb640ff',
              }}
            >
              <div style={{margin: 'auto'}}>
                <p>
                  <b>FROM:</b>
                </p>
                <p>{orderInfo.pizzeriaAddress}</p>
              </div>
              {orderType === 'Delivery' && (
                <div style={{marginLeft: '10px'}}>
                  <p>
                    <b>TO:</b>
                  </p>
                  <p>
                    {orderInfo.userAddress} {orderInfo.userAddress2}
                  </p>
                </div>
              )}
              <div>
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
              style={{
                backgroundColor: '#0c2720ff',
                color: '#f5eee6',
                padding: '10px 0 25px 0',
              }}
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
                  minHeight: '50px',
                  margin: 'auto',
                  color: 'black',
                  textWrap: 'pretty',
                }}
              >
                {orderInfo.details}
              </p>
            </div>
          )}
          <div>
            <h2
              id="checkout-items-h2"
              style={{
                backgroundColor: '#710009',
                margin: '10px 0',
                padding: '15px 0',
                color: '#F5EEE6',
              }}
            >
              ITEMS:
            </h2>
            <div id="checkout-items">
              {orderProducts.map((p) => (
                <div
                  key={`choP-${p.product.id}`}
                  style={{
                    display: 'flex',
                    margin: '5px auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid black',
                    width: '90%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '30%',
                      padding: '2%',
                    }}
                  >
                    <img
                      src={
                        p.product.filename
                          ? `${import.meta.env.VITE_API_BASE_URL}uploads/${p.product.filename}`
                          : 'https://placehold.co/120x120/green/white?text=PRODUCT'
                      }
                      alt={`Product ${p.product.name}`}
                      style={{width: '90px'}}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: 'left',
                      marginLeft: '20px',
                      width: '70%',
                    }}
                  >
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
                    margin: '5px auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid black',
                    width: '90%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '30%',
                      padding: '2%',
                    }}
                  >
                    <img
                      src={
                        m.meal.filename
                          ? `${import.meta.env.VITE_API_BASE_URL}uploads/${m.meal.filename}`
                          : 'https://placehold.co/120x120/green/white?text=PRODUCT'
                      }
                      alt={`Product ${m.meal.name}`}
                      style={{width: '90px'}}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: 'left',
                      marginLeft: '20px',
                      width: '70%',
                    }}
                  >
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
            <p>ITEMS: {discountedItemsPrice.toFixed(2)}€</p>
            <p>DELIVERY: {deliveryFee.toFixed(2)}€</p>
            <p id="checkout-total">
              <b>TOTAL: </b>
              {total.toFixed(2)}€
            </p>
          </div>
          <div>
            <form onSubmit={doCheckout} id="payment-form">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 'auto',
                  backgroundColor: '#0c2720ff',
                  color: '#F5EEE6',
                  padding: '20px 10px',
                }}
              >
                <label htmlFor="coupon-input">DISCOUNT COUPON: </label>
                <input
                  type="text"
                  name="coupon"
                  id="coupon-input"
                  placeholder="Give discount coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #710009',
                    borderRadius: '4px',
                    margin: '5px auto 10px auto',
                    width: '80%',
                  }}
                />
                <label htmlFor="payment-type">SELECT PAYMENT METHOD: </label>
                <select
                  name="payment-type"
                  id="payment-type"
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #710009',
                    borderRadius: '4px',
                    margin: '5px auto 10px auto',
                    width: '50%',
                  }}
                >
                  <option value="bill">Klarna</option>
                  <option value="creditcard">Card</option>
                  <option value="at-pickup">At pickup</option>
                  <option value="bank">Online bank</option>
                </select>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 'auto',
                }}
              >
                <button type="submit" className="checkout-btn">
                  ORDER
                </button>
              </div>
            </form>
            <button onClick={() => navigate('/order')} className="change-btn">
              EDIT ORDER
            </button>
          </div>
        </div>
      )}
      {orderId && (
        <div style={{width: '90%', margin: '10px auto'}} id="after-checkout">
          <h1>ORDER PLACED</h1>
          <p>
            Your order number: <b>{orderId}</b>
          </p>
          <p>
            Logged in users can check their order's progress through profile
            page. <br />
            All customers will be send a notice through email and phone <br />
            when order is ready.
          </p>
          <button onClick={() => navigate('/')} id="after-checkout-btn">
            Return to main page
          </button>
        </div>
      )}
    </>
  );
};

export default CheckOut;
