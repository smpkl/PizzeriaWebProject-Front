import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { useOrder } from '../../hooks/apiHooks';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const {getOrders} = useOrder();

  useEffect( () => {
    const fetchOrders = async () => {
      const orderList = await getOrders();
      setOrders(orderList.orders)
    }
    fetchOrders();
  },[updateList])

  const styleContainer = {'display': 'flex', 'justifyContent': 'center'}
  const styleOrders = {'border': '5px solid black', 'margin': '1rem', 'padding': '0.5rem'}
  return (
    <div style={styleContainer}>
      <div style={styleOrders}>
        <h2>New orders</h2>
        {orders
          .filter((order) => ['new', 'received'].includes(order.status))
          .map((order) => (
            <OrderCard key={order.id} order={order} setUpdateList={setUpdateList} updateList={updateList} />
          ))}
      </div>
      <div style={styleOrders}>
        <h2>Active orders</h2>
        {orders
          .filter((order) => order.status === 'in_progress')
          .map((order) => (
            <OrderCard key={order.id} order={order} setUpdateList={setUpdateList} updateList={updateList} />
          ))}
      </div>
    </div>
  );
};

export default AdminOrders;
