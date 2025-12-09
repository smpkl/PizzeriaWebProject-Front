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

  return (
    <>
      <h2>ALL ORDERS</h2>
      {orders && (
        <div className="admin-orders__container">
          <div className="admin-orders__column">
            <h2>New orders</h2>
            {orders
              .filter((order) => ['new', 'received'].includes(order.status))
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  setUpdateList={setUpdateList}
                  updateList={updateList}
                />
              ))}
          </div>
          <div className="admin-orders__column">
            <h2>Active orders</h2>
            {orders
              .filter((order) => order.status === 'in_progress')
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  setUpdateList={setUpdateList}
                  updateList={updateList}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;
