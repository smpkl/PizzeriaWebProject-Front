import {createContext, useState, useEffect} from 'react';

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
  const [isActiveOrder, setIsActiveOrder] = useState(false);
  const [orderUserId, setOrderUserId] = useState(null);

  const [orderType, setOrderType] = useState(null);

  const [orderInfo, setOrderInfo] = useState({
    userAddress: '',
    userAddress2: '',
    pizzeriaAddress: '',
    timeOption: '',
    day: '',
    time: '',
    name: '',
    email: '',
    phonenumber: '',
    details: '',
  });

  //Shopping cart related:
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderMeals, setOrderMeals] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('order');
    const savedDetails = sessionStorage.getItem('order-info');
    if (savedCart) {
      const data = JSON.parse(savedCart);
      setOrderProducts(data.orderProducts || []);
      setOrderMeals(data.orderMeals || []);
      setOrderPrice(data.orderPrice || 0);
      setIsActiveOrder(data.isActiveOrder || false);
      setOrderUserId(data.orderUserId || null);
    }
    if (savedDetails) {
      const data2 = JSON.parse(savedDetails);
      setOrderInfo(data2);
      setOrderType(data2.type);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    const data = {
      orderProducts,
      orderMeals,
      orderUserId,
      orderPrice,
      isActiveOrder,
    };

    localStorage.setItem('order', JSON.stringify(data));
  }, [
    orderProducts,
    orderMeals,
    orderPrice,
    isActiveOrder,
    hasLoaded,
    orderUserId,
  ]);

  useEffect(() => {
    if (!hasLoaded) return;

    sessionStorage.setItem(
      'order-info',
      JSON.stringify({...orderInfo, type: orderType}),
    );
  }, [orderType, orderInfo, hasLoaded]);

  const resetOrderContext = () => {
    setIsActiveOrder(false);
    setOrderMeals([]);
    setOrderProducts([]);
    setOrderPrice(null);
    setOrderType(null);
    setOrderUserId(null);
    setOrderInfo({
      userAddress: '',
      userAddress2: '',
      pizzeriaAddress: '',
      timeOption: '',
      day: '',
      time: '',
      name: '',
      email: '',
      phonenumber: '',
      details: '',
    });
  };

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

        //console.log('Products in order:', updated);
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
      setOrderPrice((prev) =>
        Number((prev - Number(product.price)).toFixed(2)),
      );
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
          //console.log('No items. Clear cart...');
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

      setOrderPrice((prev) =>
        Number(
          (prev - Number(product.price) * theseProducts.quantity).toFixed(2),
        ),
      );

      let updated;
      setOrderProducts((prev) => {
        updated = prev.filter((p) => p.product.id !== product.id);

        if (updated.length === 0 && orderMeals.length === 0) {
          //console.log('No items. Clear cart...');
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
      setOrderPrice((prev) => Number((prev + Number(meal.price)).toFixed(2)));
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

        //console.log('Meals in order:', updated);
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
      setOrderPrice((prev) => Number((prev - Number(meal.price)).toFixed(2)));
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
          //console.log('No items. Clear cart...');
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

      setOrderPrice((prev) =>
        Number((prev - Number(meal.price) * theseMeals).toFixed(2)),
      );

      let updated;
      setOrderMeals((prev) => {
        updated = prev.filter((m) => m.meal.id !== meal.id);

        if (updated.length === 0 && orderProducts.length === 0) {
          //console.log('No items. Clear cart...');
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

  const handleTypeChange = (type) => {
    try {
      setOrderType(type);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const handleOrderInfoChange = (newValues) => {
    setOrderInfo((prev) => ({...prev, ...newValues}));
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
        handleTypeChange,
        handleOrderInfoChange,
        orderProducts,
        orderMeals,
        orderPrice,
        orderType,
        orderInfo,
        isActiveOrder,
        setIsActiveOrder,
        resetOrderContext,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export {OrderProvider, OrderContext};
