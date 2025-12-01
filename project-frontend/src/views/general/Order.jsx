import {useNavigate} from 'react-router';
import {useOrderContext} from '../../hooks/contextHooks';

// Tilaus/Ostokori käyttäjälle (se ensimmäinen vaihe)
const Order = () => {
  const {
    orderProducts,
    orderMeals,
    handleProductAdd,
    handleProductRemove,
    handleProductDelete,
    handleMealAdd,
    handleMealRemove,
    handleMealDelete,
    handleClear,
  } = useOrderContext();
  console.log(orderMeals, orderProducts);
  const navigate = useNavigate();

  return (
    <>
      <h1>ORDER</h1>
      <div>
        {orderProducts.length === 0 && orderMeals.length === 0 && (
          <div>
            <p>No items added to order.</p>
          </div>
        )}

        {(orderProducts.length > 0 || orderMeals.length > 0) && (
          <div>
            <h2>SHOPPING CART</h2>
            <div style={{border: '1px solid black'}}>
              {orderProducts.map((item) => (
                <div style={{display: 'flex'}} key={item.product.id}>
                  <p>
                    {item.product.name} --- {item.product.price}€
                  </p>
                  <div
                    style={{display: 'flex', gap: '5px', marginLeft: '10px'}}
                  >
                    <button onClick={() => handleProductRemove(item.product)}>
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleProductAdd(item.product)}>
                      +
                    </button>
                    <button
                      onClick={() => handleProductDelete(item.product)}
                      style={{backgroundColor: 'darkred'}}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
              {orderMeals.map((item) => (
                <div style={{display: 'flex'}} key={item.meal.id}>
                  <p>
                    {item.meal.name} --- {item.meal.price}€
                  </p>
                  <div
                    style={{display: 'flex', gap: '5px', marginLeft: '10px'}}
                  >
                    <button onClick={() => handleMealRemove(item.meal)}>
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleMealAdd(item.meal)}>+</button>
                    <button
                      onClick={() => handleMealDelete(item.meal)}
                      style={{backgroundColor: 'darkred'}}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <button onClick={() => handleClear()} style={{margin: 'auto'}}>
            Clear cart
          </button>
          <button
            onClick={() => navigate('/', {state: {scrollToMenu: true}})}
            style={{margin: 'auto'}}
          >
            Back to shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default Order;
