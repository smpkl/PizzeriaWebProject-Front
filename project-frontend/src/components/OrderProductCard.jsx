import React from 'react';

const OrderProductCard = ({product}) => {
  const containerStyle = {display: 'flex'};
  const productStyle = {borderBottom: '1px solid #ccc', marginLeft: '0.5rem'};
  return (
    <tr>
      <td>
        <p style={productStyle}>{product.name}</p>
      </td>
      <td>
        <p style={productStyle}>{product.quantity} pcs</p>
      </td>
    </tr>
  );
};

export default OrderProductCard;
