import React from 'react';

const OrderProductCard = ({product}) => {
  const containerStyle = {display: 'flex'};
  const productStyle = {borderBottom: '1px solid #ccc'};
  return (
    <div style={containerStyle}>
      <p style={productStyle}>{product.name}</p>
      <p style={productStyle}>{product.count}</p>
    </div>
  );
};

export default OrderProductCard;
