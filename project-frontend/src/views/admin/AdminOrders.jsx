import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { useOrder } from '../../hooks/apiHooks';

const AdminOrders = () => {
//mock dataa testaamista varten, tuossa muodossa pitäis saada tulee apista
//const orders = mockOrderList;
// import { mockOrderList } from '../../mock-data/ordersMockData';
  const [orders, setOrders] = useState([]);

  const {getOrders} = useOrder();

  useEffect( () => {
    const fetchOrders = async () => {
      const orderList = await getOrders();
      setOrders(orderList.orders)
    }
    fetchOrders();
  },[])

  const styleContainer = {'display': 'flex', 'justifyContent': 'center'}
  const styleOrders = {'border': '5px solid black', 'margin': '1rem', 'padding': '0.5rem'}
  return (
    <div style={styleContainer}>
      <div style={styleOrders}>
        <h2>New orders</h2>
        {orders
          .filter((order) => ['new', 'received'].includes(order.status))
          .map((order) => (
            <OrderCard key={order.id} orderInfo={order} />
          ))}
      </div>
      <div style={styleOrders}>
        <h2>Active orders</h2>
        {orders
          .filter((order) => order.status === 'in_progress')
          .map((order) => (
            <OrderCard key={order.id} orderInfo={order} />
          ))}
      </div>
    </div>
  );
};

export default AdminOrders;
