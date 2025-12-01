import {createContext, useState, useEffect} from 'react';
import {useOrder} from '../hooks/apiHooks';

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
  const [isActiveOrder, setIsActiveOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderUserId, setOrderUserId] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderMeals, setOrderMeals] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);

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
      setOrderPrice(data.orderPrice || 0);
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
      orderPrice,
      isActiveOrder,
    };

    localStorage.setItem('order', JSON.stringify(data));
  }, [
    orderProducts,
    orderMeals,
    orderId,
    orderPrice,
    isActiveOrder,
    hasLoaded,
  ]);

  const handleProductAdd = async (product) => {
    try {
      setOrderPrice((prev) =>
        Number((prev + Number(product.price)).toFixed(2)),
      );
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
      const newPrice = orderPrice - Number(product.price);
      setOrderPrice(newPrice);
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

        if (updated.length === 0 && orderMeals.length === 0) {
          console.log('No items. Clear cart...');
          setIsActiveOrder(true);
          setOrderPrice(0);
        }
        return updated;
      });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleProductDelete = async (product) => {
    try {
      const theseProducts = orderProducts.find(
        (p) => p.product.id === product.id,
      );

      const newPrice =
        orderPrice - Number(product.price) * theseProducts.quantity;
      setOrderPrice(newPrice);

      let updated;
      setOrderProducts((prev) => {
        updated = prev.filter((p) => p.product.id !== product.id);

        if (updated.length === 0 && orderMeals.length === 0) {
          console.log('No items. Clear cart...');
          setIsActiveOrder(true);
          setOrderPrice(0);
        }

        return updated;
      });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleMealAdd = async (meal) => {
    try {
      const newPrice = orderPrice + Number(meal.price);
      setOrderPrice(newPrice);
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
      const newPrice = orderPrice - Number(meal.price);
      setOrderPrice(newPrice);
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

        if (updated.length === 0 && orderProducts.length === 0) {
          console.log('No items. Clear cart...');
          setIsActiveOrder(true);
          setOrderPrice(0);
        }
        return updated;
      });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleMealDelete = async (meal) => {
    try {
      const theseMeals = orderMeals.find((m) => m.meal.id === meal.id);

      const newPrice = orderPrice - Number(meal.price) * theseMeals.quantity;
      setOrderPrice(newPrice);

      let updated;
      setOrderMeals((prev) => {
        updated = prev.filter((m) => m.meal.id !== meal.id);

        if (updated.length === 0 && orderProducts.length === 0) {
          console.log('No items. Clear cart...');
          setIsActiveOrder(true);
          setOrderPrice(0);
        }

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
      setOrderPrice(0);
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
        orderPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export {OrderProvider, OrderContext};
