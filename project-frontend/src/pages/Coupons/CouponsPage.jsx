
import React, { useState } from 'react';
import CouponForm from '../../components/coupons/CouponForm';
import CouponList from '../../components/coupons/CouponList';

export default function CouponsPage() {
  const [editing, setEditing] = useState(null);
  const handleSaved = () => setEditing(null);

  return (
    <div className="page">
      <h1>Manage Coupons</h1>
      <div className="grid-2">
        <div>
          <h2>{editing ? 'Edit Coupon' : 'Add Coupon'}</h2>
          <CouponForm onSaved={handleSaved} initial={editing} />
        </div>
        <div>
          <h2>Existing Coupons</h2>
          <CouponList onEdit={(c) => setEditing(c)} />
        </div>
      </div>
    </div>
  );
}
