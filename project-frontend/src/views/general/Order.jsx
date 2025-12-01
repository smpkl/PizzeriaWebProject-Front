import {useNavigate} from 'react-router';
import {useOrderContext} from '../../hooks/contextHooks';

// Tilaus/Ostokori käyttäjälle (se ensimmäinen vaihe)
const Order = () => {
  const {orderProducts, orderMeals} = useOrderContext();
  console.log(orderMeals, orderProducts);
  const navigate = useNavigate();

  return (
    <>
      <h1>ORDER</h1>
      <div>
        {orderProducts.length === 0 && orderMeals.length === 0 && (
          <div>
            {' '}
            <p>No items added to order.</p>{' '}
            <button
              onClick={() => navigate('/', {state: {scrollToMenu: true}})}
            >
              Back to shopping
            </button>
          </div>
        )}
        {orderProducts.length > 0 && orderMeals.length > 0 && (
          <div>
            {' '}
            <h2>SHOPPING CART</h2>{' '}
            <div style={{border: '1px solid black'}}>
              {orderProducts.map((item) => (
                <p>{item.name}</p>
              ))}
            </div>
            <button
              onClick={() => navigate('/', {state: {scrollToMenu: true}})}
            >
              Back to shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
