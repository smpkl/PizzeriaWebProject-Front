import React, {useEffect, useState} from 'react';
import OrderProductCard from './OrderProductCard';
import {useOrder} from '../hooks/apiHooks';

const OrderCard = ({order, setUpdateList, updateList}) => {
  const {getOrderProducts} = useOrder();
  const [orderProducts, setOrderProducts] = useState([]);
  const {putOrder} = useOrder();
  const style = {
    border: '1px solid grey',
    margin: '0.5rem',
    padding: '0.2rem',
  };

  const styles = {
    card: {
      ...style,
      borderRadius: '10px',
    },
    products: {
      ...style,
      flex: '1 1 50%',
      textAlign: 'left',
    },
    customer: {
      ...style,
      flex: '1 1 50%',
      textAlign: 'left',
    },
    contentRow: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    },
    buttonsRow: {
      marginTop: '0.5rem',
      display: 'flex',
      gap: '0.5rem',
    },
    button: {
      margin: '0.1rem',
      padding: '4px 10px',
      borderRadius: '6px',
      border: '1px solid #000',
      backgroundColor: '#e0e0e0',
      cursor: 'pointer',
    },
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
  } = order;

  const doPutOrder = async (body) => {
    try {
      const successfullUpdate = await putOrder(id, body);
      setUpdateList(!updateList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrderProducts = async () => {
      const productList = await getOrderProducts(id);
      console.log(productList);
      setOrderProducts(productList.products);
    };
    fetchOrderProducts();
  }, []);
  return (
    <div style={styles.card}>
      <h3>Orders information</h3>
      <div style={styles.contentRow}>
        <div style={styles.products}>
          <h4>Products: </h4>
          <table>
            <tr>
            <th>Product name:</th>
            <th>Quantity</th>
            </tr>
          {orderProducts.map((product) => (
            <OrderProductCard key={`${id}-${product.id}`} product={product} />
          ))}
          </table>
        </div>
        <div style={styles.customer}>
          <h4>Customer ingormation:</h4>
          <p>Customer name: {customer_name}</p>
          <p>Customer Email: {customer_email}</p>
          <p>Customer Phone: {customer_phone}</p>
          <p>Customer address: {delivery_address}</p>
          <p>Details: {details}</p>
          <p>Price: {price} €</p>
          <p>Time option: {time_option}</p>
          <p>Date: {date_time}</p>
          <p>Pizzeria address: {pizzeria_address}</p>
        </div>
      </div>
      <div style={styles.buttonsRow}>
        {((status === 'new' || status === 'received') && (
          <>
            <button
              onClick={(evt) => {
                evt.preventDefault();
                doPutOrder({status: 'in_progress'});
              }}
            >
              Accept
            </button>
            <button
              onClick={(evt) => {
                evt.preventDefault();
                doPutOrder({status: 'cancelled'});
              }}
            >
              Cancel
            </button>
          </>
        )) ||
          (status === 'in_progress' && (
            <button
              onClick={(evt) => {
                evt.preventDefault();
                doPutOrder({status: 'completed'});
              }}
            >
              Completed
            </button>
          ))}
      </div>
    </div>
  );
};

export default OrderCard;
