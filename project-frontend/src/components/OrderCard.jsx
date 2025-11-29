import React from 'react';
import OrderProductCard from './OrderProductCard';

const OrderCard = (order) => {
  const {
    status,
    order_type: orderType,
    delivery_address: deliveryAddress,
  } = order.orderInfo;

  const products = order.orderInfo.products;


  //Laitan jo 2 kieli optiota joka hallitaa tod näk shared contextilla
  const langEn = false;
  const langFin = true;

  const styleOrderCard = {'border': '1px solid grey', 'margin': '0.5rem', 'padding': '0.2rem'}
  return (
    <div style={styleOrderCard}>
      {(langEn && (
        <>
          <h3>Orders information</h3>
          {products.map((product) => (
            <OrderProductCard
              key={product.id}
              product={product}
              orderType={orderType}
              deliveryAddress={deliveryAddress}
            />
          ))}
          {(status === 'new' && (
            <>
              <button>Accept</button> <button>Cancel</button>
            </>
          )) ||
            (status === 'pending' && <button>Completed</button>)}
        </>
      )) ||
        (langFin && (
          <>
            <h3>Tilauksen tiedot</h3>
            {products.map((product) => (
              <OrderProductCard
                key={product.id}
                product={product}
                orderType={orderType}
                deliveryAddress={deliveryAddress}
              />
            ))}
            {(status === 'new' && (
              <>
                <button>Hyväksy</button> <button>peruuta</button>
              </>
            )) ||
              (status === 'pending' && <button>Valmis</button>)}
          </>
        ))}
    </div>
  );
};

export default OrderCard;
