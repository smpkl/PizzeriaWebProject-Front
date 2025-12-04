import React, {useEffect, useState} from 'react';
import OrderProductCard from './OrderProductCard';
import {useOrder} from '../hooks/apiHooks';

const OrderCard = (order) => {
  const {getOrderProducts} = useOrder();
  const [orderProducts, setOrderProducts] = useState([]);
  const styleOrderCard = {
    border: '1px solid grey',
    margin: '0.5rem',
    padding: '0.2rem',
  };

  const styleProducts = {
    border: '1px solid grey',
    margin: '0.5rem',
    padding: '0.2rem',
  };

  const {
    id,
    user_id,
    status,
    order_type,
    time_option,
    date_time,
    delivery_address,
    pizzeria_address,
    customer_name,
    customer_phone,
    customer_email,
    details,
    price,
  } = order.orderInfo;

  useEffect(() => {
    const fetchOrderProducts = async () => {
      const productList = await getOrderProducts(id);
      setOrderProducts(productList.products);
    };
    fetchOrderProducts();
  }, []);
  return (
    <div style={styleOrderCard}>
      <>
        <h3>Orders information</h3>
        <div style={styleProducts}>
          <h4>Products: </h4>
          {orderProducts.map((product) => (
            <OrderProductCard
              key={`${id}-${product.id}`}
              product={product}
            />
          ))}
        </div>
        <p>Customer name: {customer_name}</p>
        <p>Customer Email: {customer_email}</p>
        <p>Customer Phone: {customer_phone}</p>
        <p>Customer address: {delivery_address}</p>
        <p>Details: {details}</p>
        <p>Price: {price} €</p>
        <p>Time option: {time_option}</p>
        <p>Date: {date_time}</p>
        <p>Pizzeria address: {pizzeria_address}</p>
        {(status === 'new' || status==='received' && (
          <>
            <button>Accept</button> <button>Cancel</button>
          </>
        )) ||
          (status === 'in_progress' && <button>Completed</button>)}
      </>
    </div>
  );
};

export default OrderCard;
