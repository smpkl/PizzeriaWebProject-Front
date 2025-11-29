import React from 'react';

const OrderProductCard = ({product, orderType, deliveryAddress}) => {

  const containerStyle = {'display': 'flex'}
  const productStyle = {'border-bottom': '1px solid #ccc'};
  return (
    <div>
      <div style={containerStyle}>
        <p style={productStyle}>{product.name}</p>
        <p style={productStyle}>{product.count}</p>
      </div>
      {orderType === 'delivery' && <p style={productStyle}>{deliveryAddress}</p>}
    </div>
  );
};

export default OrderProductCard;
