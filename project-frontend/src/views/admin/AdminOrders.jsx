import React from 'react';
import OrderCard from '../../components/OrderCard';
import { mockOrderList } from '../../mock-data/ordersMockData';

const AdminOrders = () => {
//mock dataa testaamista varten, tuossa muodossa pitäis saada tulee apista
const orders = mockOrderList;

  //Laitan jo 2 kieli optiota joka hallitaa tod näk shared contextilla
  const langEn = true;
  const langFin = false;
  const styleContainer = {'display': 'flex', 'justifyContent': 'center'}
  const styleOrders = {'border': '5px solid black', 'margin': '1rem', 'padding': '0.5rem'}
  return (
    <div style={styleContainer}>
      <div style={styleOrders}>
        {(langEn && <h2>New orders</h2>) ||
          (langFin && <h2>Uudet tilaukset</h2>)}
        {orders
          .filter((order) => order.status === 'new')
          .map((order) => (
            <OrderCard key={order.id} orderInfo={order} />
          ))}
      </div>
      <div style={styleOrders}>
        {(langEn && <h2>Active orders</h2>) ||
          (langFin && <h2>Aktiiviset tilaukset</h2>)}
        {orders
          .filter((order) => order.status === 'pending')
          .map((order) => (
            <OrderCard key={order.id} orderInfo={order} />
          ))}
      </div>
    </div>
  );
};

export default AdminOrders;
