import {useNavigate, useLocation} from 'react-router';
import {useOrderContext, useUserContext} from '../../hooks/contextHooks';
import OrderTypeButtons from '../../components/OrderTypeButtons';
import DeliveryForm from '../../components/DeliveryForm';
import PickUpForm from '../../components/PickUpForm';
import AtPizzeriaForm from '../../components/AtPizzeriaForm';
import {useEffect, useState} from 'react';

const Order = () => {
  const [error, setError] = useState('');
  const {user} = useUserContext();
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    orderProducts,
    orderMeals,
    orderPrice,
    orderType,
    orderUserId,
    setOrderUserId,
    handleProductAdd,
    handleProductRemove,
    handleProductDelete,
    handleMealAdd,
    handleMealRemove,
    handleMealDelete,
    handleClear,
  } = useOrderContext();

  useEffect(() => {
    if (user) setOrderUserId(user.user_id);
    else setOrderUserId(null);
  }, [user]);

  // Check if location.state contains am error:
  useEffect(() => {
    const err = location.state?.error;

    if (err) {
      setError(err.message);
      navigate(location.pathname, {replace: true, state: {}}); // Reset the state after a error is set
    }
  }, [location.state]);

  // If there is an error, scroll to it:
  useEffect(() => {
    if (!error) return;

    const elem = document.getElementById('error');
    if (elem) elem.scrollIntoView({behavior: 'smooth'});
  }, [error]);

  useEffect(() => {
    let count = 0;
    if (orderProducts) orderProducts.forEach((p) => (count += p.quantity));
    if (orderMeals) orderMeals.forEach((m) => (count += m.quantity));
    setItemCount(count);
  }, [orderProducts, orderMeals]);

  return (
    <>
      <h1>ORDER</h1>
      <div>
        {orderProducts.length === 0 && orderMeals.length === 0 && (
          <div>
            <p>No items added to order.</p>
          </div>
        )}
        {
          /*Näytä ostokori ja tilausvaihtoehdot jos tuotteita on lisätty tilaukseen*/ (orderProducts.length >
            0 ||
            orderMeals.length > 0) && (
            <div>
              <h2
                style={{
                  backgroundColor: '#710009',
                  color: '#F5EEE6',
                  margin: '0',
                  padding: '10px',
                }}
              >
                SHOPPING CART
              </h2>
              <div id="shopping-cart">
                {orderProducts.map((item) => (
                  <div
                    className="cart-item"
                    key={`order-product-` + item.product.id}
                  >
                    <p>
                      {item.product.name} --- {item.product.price}€
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        gap: '5px',
                        marginLeft: '20px',
                        marginRight: '2%',
                        alignItems: 'center',
                        fontSize: '25px',
                      }}
                    >
                      <button
                        onClick={() => handleProductRemove(item.product)}
                        className="addRemoveBtn"
                      >
                        -
                      </button>
                      <p style={{margin: '0', width: '30px'}}>
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => handleProductAdd(item.product)}
                        className="addRemoveBtn"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleProductDelete(item.product)}
                        className="deleteBtn"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
                {orderMeals.map((item) => (
                  <div className="cart-item" key={'order-meal-' + item.meal.id}>
                    <p>
                      {item.meal.name} --- {item.meal.price}€
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        gap: '5px',
                        marginLeft: '20px',
                        marginRight: '2%',
                        alignItems: 'center',
                        fontSize: '25px',
                      }}
                    >
                      <button
                        onClick={() => handleMealRemove(item.meal)}
                        className="addRemoveBtn"
                      >
                        -
                      </button>
                      <p style={{margin: '0', width: '30px'}}>
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => handleMealAdd(item.meal)}
                        className="addRemoveBtn"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleMealDelete(item.meal)}
                        className="deleteBtn"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
                <p style={{fontSize: '18px'}}>Items: {itemCount}</p>
                <p style={{fontSize: '20px', fontWeight: 'bold'}}>
                  TOTAL: {orderPrice.toFixed(2)}€
                </p>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <button onClick={() => handleClear()} className="change-btn">
                    Clear cart
                  </button>
                  <button
                    onClick={() => navigate('/', {state: {scrollToMenu: true}})}
                    className="dark-btn"
                  >
                    Back to shopping
                  </button>
                </div>
              </div>
              <div>
                <h2>CHOOSE ORDER TYPE</h2>
                {error && (
                  <p
                    id="error"
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      scrollMarginTop: '40vh',
                    }}
                  >
                    {error}
                  </p>
                )}
                <OrderTypeButtons />
                {orderType === 'Delivery' && <DeliveryForm />}
                {orderType === 'Pick up' && <PickUpForm />}
                {orderType === 'At pizzeria' && <AtPizzeriaForm />}
              </div>
            </div>
          )
        }
        <button
          onClick={() => navigate('/', {state: {scrollToMenu: true}})}
          className="dark-btn"
        >
          Back to shopping
        </button>
      </div>
    </>
  );
};

export default Order;
