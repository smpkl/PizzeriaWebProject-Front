import {createContext, useState, useEffect} from 'react';
import {useOrder} from '../hooks/apiHooks';

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
  const [isActiveOrder, setIsActiveOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderUserId, setOrderUserId] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderMeals, setOrderMeals] = useState([]);

  const {postOrder, postProductToOrder} = useOrder();

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('order');
    if (saved) {
      const data = JSON.parse(saved);
      setOrderProducts(data.orderProducts || []);
      setOrderMeals(data.orderMeals || []);
      setOrderId(data.orderId || null);
      setOrderUserId(data.orderUserId || null);
      setIsActiveOrder(data.isActiveOrder || false);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    const data = {
      orderProducts,
      orderMeals,
      orderId,
      orderUserId,
      isActiveOrder,
    };

    localStorage.setItem('order', JSON.stringify(data));
  }, [orderProducts, orderMeals, orderId, isActiveOrder, hasLoaded]);

  const handleProductAdd = async (product) => {
    try {
      if (isActiveOrder) {
        console.log('Order productId: ', product);
        setOrderProducts((prev) => {
          const updated = [...prev, product];
          console.log('Products in order:', updated);
          return updated;
        });
      }
      console.log('New order');
      setOrderProducts((prev) => {
        const updated = [...prev, product];
        console.log('Products in order:', updated);
        return updated;
      });
      setIsActiveOrder(true);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleMealAdd = async (meal) => {
    try {
      if (isActiveOrder) {
        console.log('Order mealId: ', meal);
        setOrderMeals((prev) => {
          const updated = [...prev, meal];
          console.log('Meals in order:', updated);
          return updated;
        });
      }
      //const orderInfo = await postOrder();
      console.log('New order');
      setOrderMeals((prev) => {
        const updated = [...prev, meal];
        console.log('Meals in order:', updated);
        return updated;
      });
      setIsActiveOrder(true);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  return (
    <OrderContext.Provider
      value={{handleProductAdd, handleMealAdd, orderProducts, orderMeals}}
    >
      {children}
    </OrderContext.Provider>
  );
};
export {OrderProvider, OrderContext};
