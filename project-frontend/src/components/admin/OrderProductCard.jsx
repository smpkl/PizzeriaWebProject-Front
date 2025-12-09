import React from 'react';
import '../../admincss/admin.css';

const OrderProductCard = ({product}) => {
  return (
    <tr className="order-product-row">
      <td>
        <p>{product.name}</p>
      </td>
      <td>
        <p>{product.quantity} pcs</p>
      </td>
    </tr>
  );
};

export default OrderProductCard;
