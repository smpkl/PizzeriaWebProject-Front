import React, {useEffect, useState} from 'react';
import OrderProductCard from './OrderProductCard';
import {useOrder} from '../../hooks/apiHooks';

const OrderCard = ({order, setUpdateList, updateList}) => {
  const {getOrderProducts} = useOrder();
  const [orderProducts, setOrderProducts] = useState([]);
  const {putOrder} = useOrder();
  const style = {
    border: '1px solid grey',
    margin: '0',
    padding: '0.2rem',
  };

  const styles = {
    card: {
      ...style,
      borderRadius: '10px',
    },
    products: {
      ...style,
      margin: '0.1rem',
      flex: '1 1 40%',
      textAlign: 'left',
    },
    customer: {
      ...style,
      flex: '1 1 60%',
      textAlign: 'left',
    },
    table: {},
    td: {padding: '2px 4px', border: '1px solid black'},
    p: {
      padding: '0',
      margin: '0.1rem',
    },
    contentRow: {
      display: 'flex',
      gap: '0.3rem',
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

  const formatDateTime = (isoString) =>
    isoString.replace('T', ' ').slice(0, 16);

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
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name:</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((product) => (
                <OrderProductCard
                  key={`${id}-${product.id}`}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.customer}>
          <h4>Customer ingormation:</h4>
          <table>
            <tbody>
              <tr>
                <td style={styles.td}>
                  <p style={styles.p}>name:</p>
                </td>
                <td style={styles.td}>
                  <p style={styles.p}>{customer_name}</p>
                </td>
              </tr>
              {customer_email && (
                <tr>
                  <td style={styles.td}>
                    <p style={styles.p}>Email:</p>
                  </td>
                  <td style={styles.td}>
                    <p style={styles.p}>{customer_email}</p>
                  </td>
                </tr>
              )}
              {customer_phone && (
                <tr>
                  <td style={styles.td}>
                    <p style={styles.p}>Phone:</p>
                  </td>
                  <td style={styles.td}>
                    <p style={styles.p}>{customer_phone}</p>
                  </td>
                </tr>
              )}
              {order_type.toLowerCase() === 'delivery' && (
                <tr>
                  <td style={styles.td}>
                    <p style={styles.p}>Address:</p>
                  </td>
                  <td style={styles.td}>
                    <p style={styles.p}>{delivery_address}</p>
                  </td>
                </tr>
              )}
              {details && (
                <tr>
                  <td style={styles.td}>
                    <p style={styles.p}>Details:</p>
                  </td>
                  <td style={styles.td}>
                    <p style={styles.p}>{details}</p>
                  </td>
                </tr>
              )}
              <tr>
                <td style={styles.td}>
                  <p style={styles.p}>Price:</p>
                </td>
                <td style={styles.td}>
                  <p style={styles.p}>{price} €</p>
                </td>
              </tr>
              <tr>
                <td style={styles.td}>
                  <p style={styles.p}>Time option:</p>
                </td>
                <td style={styles.td}>
                  <p style={styles.p}>{time_option}</p>
                </td>
              </tr>
              <tr>
                <td style={styles.td}>
                  <p style={styles.p}>Order time:</p>
                </td>
                <td style={styles.td}>
                  <p style={styles.p}>{formatDateTime(date_time)}</p>
                </td>
              </tr>
              <tr>
                <td style={styles.td}>
                  <p style={styles.p}>Pizzeria:</p>
                </td>
                <td style={styles.td}>
                  <p style={styles.p}>{pizzeria_address}</p>
                </td>
              </tr>
            </tbody>
          </table>
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
