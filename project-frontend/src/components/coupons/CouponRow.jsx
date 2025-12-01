
import React, { useState } from 'react';
import { couponsApi } from '../../api/couponsApi';

export default function CouponRow({ coupon, onEdit, onDeleted }) {
  const [busy, setBusy] = useState(false);

  const remove = async () => {
    if (!confirm(`Delete coupon "${coupon.coupon}"?`)) return;
    setBusy(true);
    try {
      await couponsApi.remove(coupon.id);
      onDeleted?.(coupon.id);
    } catch (err) {
      alert('Failed to delete coupon');
    } finally {
      setBusy(false);
    }
  };

  return (
    <tr>
      <td>{coupon.coupon}</td>
      <td>{coupon.discount_percentage}</td>
      <td>{new Date(coupon.start_date).toLocaleDateString()}</td>
      <td>{new Date(coupon.end_date).toLocaleDateString()}</td>
      <td>
        <button onClick={() => onEdit?.(coupon)} disabled={busy}>Edit</button>
        <button onClick={remove} disabled={busy}>Delete</button>
      </td>
    </tr>
  );
}
