import React, {useEffect, useState} from 'react';
import OrderProductCard from './OrderProductCard';
import {useOrder} from '../../hooks/apiHooks';
import '../../admincss/admin.css';

const OrderCard = ({order, setUpdateList, updateList}) => {
  const {getOrderProducts} = useOrder();
  const [orderProducts, setOrderProducts] = useState([]);
  const {putOrder} = useOrder();
  const style = {
    border: '1px solid grey',
    margin: '0',
    padding: '0.2rem',
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
      setOrderProducts(productList.products);
    };
    fetchOrderProducts();
  }, []);
  return (
    <div className="order-card">
      <h3>Orders information</h3>
      <div className="order-card__content-row">
        <div className="order-card__products">
          <h4>Products: </h4>
          <table className="order-card__table">
            <thead>
              <tr>
                <th>Name:</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts?.map((product) => (
                <OrderProductCard
                  key={`${id}-${product.id}`}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-card__customer">
          <h4>Customer information:</h4>
          <table>
            <tbody>
              <tr>
                <td className="order-card__td">
                  <p className="order-card__p">name:</p>
                </td>
                <td className="order-card__td">
                  <p className="order-card__p">{customer_name}</p>
                </td>
              </tr>
              {customer_email && (
                <tr>
                  <td className="order-card__td">
                    <p className="order-card__p">Email:</p>
                  </td>
                  <td className="order-card__td">
                    <p className="order-card__p">{customer_email}</p>
                  </td>
                </tr>
              )}
              {customer_phone && (
                <tr>
                  <td className="order-card__td">
                    <p className="order-card__p">Phone:</p>
                  </td>
                  <td className="order-card__td">
                    <p className="order-card__p">{customer_phone}</p>
                  </td>
                </tr>
              )}
              {order_type.toLowerCase() === 'delivery' && (
                <tr>
                  <td className="order-card__td">
                    <p className="order-card__p">Address:</p>
                  </td>
                  <td className="order-card__td">
                    <p className="order-card__p">{delivery_address}</p>
                  </td>
                </tr>
              )}
              {details && (
                <tr>
                  <td className="order-card__td">
                    <p className="order-card__p">Details:</p>
                  </td>
                  <td className="order-card__td">
                    <p className="order-card__p">{details}</p>
                  </td>
                </tr>
              )}
              <tr>
                <td className="order-card__td">
                  <p className="order-card__p">Price:</p>
                </td>
                <td className="order-card__td">
                  <p className="order-card__p">{price} €</p>
                </td>
              </tr>
              <tr>
                <td className="order-card__td">
                  <p className="order-card__p">Time option:</p>
                </td>
                <td className="order-card__td">
                  <p className="order-card__p">{time_option}</p>
                </td>
              </tr>
              <tr>
                <td className="order-card__td">
                  <p className="order-card__p">Order time:</p>
                </td>
                <td className="order-card__td">
                  <p className="order-card__p">{formatDateTime(date_time)}</p>
                </td>
              </tr>
              <tr>
                <td className="order-card__td">
                  <p className="order-card__p">Pizzeria:</p>
                </td>
                <td className="order-card__td">
                  <p className="order-card__p">{pizzeria_address}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="order-card__buttons-row">
        {((status === 'new' || status === 'received') && (
          <>
            <button
              className="order-card__button"
              onClick={(evt) => {
                evt.preventDefault();
                doPutOrder({status: 'in_progress'});
              }}
            >
              Accept
            </button>
            <button
              className="order-card__button"
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
              className="order-card__button"
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
