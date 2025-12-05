import React from 'react';

const OrderProductCard = ({product}) => {
  const productStyle = {borderBottom: '1px solid #ccc'};
  const paragraphStyle = {padding: '0', margin: '0.1rem'}
  return (
    <tr>
      <td style={productStyle}>
        <p style={paragraphStyle}>{product.name}</p>
      </td>
      <td style={productStyle}>
        <p style={paragraphStyle}>{product.quantity} pcs</p>
      </td>
    </tr>
  );
};

export default OrderProductCard;
