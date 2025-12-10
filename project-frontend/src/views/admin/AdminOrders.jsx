import React, {useEffect, useState} from 'react';
import {useOrder} from '../../hooks/apiHooks';
import OrderCard from '../../components/admin/OrderCard';
import '../../admincss/admin.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const {getOrders} = useOrder();

  useEffect(() => {
    const fetchOrders = async () => {
      const orderList = await getOrders();
      setOrders(orderList.orders);
    };
    fetchOrders();
  }, [updateList]);

  const newOrders = orders.filter((order) =>
    ['new', 'received'].includes(order.status),
  );

  const activeOrders = orders.filter((order) => order.status === 'in_progress');

  if (!orders || orders.length === 0) {
    return (
      <>
        <h2>ALL ORDERS</h2>
        <p>No orders yet.</p>
      </>
    );
  }

  return (
    <>
      <h2>ALL ORDERS</h2>
      <div className="admin-orders__container">
        {newOrders.length > 0 && (
          <div className="admin-orders__column">
            <h2>New orders</h2>
            {newOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                setUpdateList={setUpdateList}
                updateList={updateList}
              />
            ))}
          </div>
        )}
        {activeOrders.length > 0 && (
          <div className="admin-orders__column">
            <h2>Active orders</h2>
            {activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                setUpdateList={setUpdateList}
                updateList={updateList}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrders;
