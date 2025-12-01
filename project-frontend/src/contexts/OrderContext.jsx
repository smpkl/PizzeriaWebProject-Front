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
      setOrderProducts((prev) => {
        const existing = prev.find((p) => p.product.id === product.id);

        let updated;
        if (existing) {
          updated = prev.map((p) =>
            p.product.id === product.id ? {...p, quantity: p.quantity + 1} : p,
          );
        } else {
          updated = [...prev, {product, quantity: 1}];
        }

        console.log('Products in order:', updated);
        return updated;
      });

      setIsActiveOrder(true);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleProductRemove = async (product) => {
    try {
      setOrderProducts((prev) => {
        const existing = prev.find((p) => p.product.id === product.id);

        let updated;
        if (existing.quantity > 1) {
          updated = prev.map((p) =>
            p.product.id === product.id ? {...p, quantity: p.quantity - 1} : p,
          );
        } else {
          updated = prev.filter((p) => p.product.id !== product.id);
        }

        console.log('Products in order:', updated);
        return updated;
      });

      setIsActiveOrder(true);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleProductDelete = async (product) => {
    try {
      let updated;
      setOrderProducts((prev) => {
        updated = prev.filter((p) => p.product.id !== product.id);
        return updated;
      });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleMealAdd = async (meal) => {
    try {
      setOrderMeals((prev) => {
        const existing = prev.find((m) => m.meal.id === meal.id);

        let updated;
        if (existing) {
          updated = prev.map((m) =>
            m.meal.id === meal.id ? {...m, quantity: m.quantity + 1} : m,
          );
        } else {
          updated = [...prev, {meal, quantity: 1}];
        }

        console.log('Meals in order:', updated);
        return updated;
      });
      setIsActiveOrder(true);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleMealRemove = async (meal) => {
    try {
      setOrderMeals((prev) => {
        const existing = prev.find((m) => m.meal.id === meal.id);

        let updated;
        if (existing.quantity > 1) {
          updated = prev.map((m) =>
            m.meal.id === meal.id ? {...m, quantity: m.quantity - 1} : m,
          );
        } else {
          updated = prev.filter((m) => m.meal.id !== meal.id);
        }
        return updated;
      });
      setIsActiveOrder(true);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleMealDelete = async (meal) => {
    try {
      let updated;
      setOrderMeals((prev) => {
        updated = prev.filter((m) => m.meal.id !== meal.id);
        return updated;
      });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleClear = () => {
    try {
      setOrderProducts([]);
      setOrderMeals([]);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        handleProductAdd,
        handleProductRemove,
        handleProductDelete,
        handleMealAdd,
        handleMealRemove,
        handleMealDelete,
        handleClear,
        orderProducts,
        orderMeals,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export {OrderProvider, OrderContext};
