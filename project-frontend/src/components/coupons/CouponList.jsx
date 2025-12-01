
import React, { useEffect, useState } from 'react';
import { couponsApi } from '../../api/couponsApi';
import CouponRow from './CouponRow';

export default function CouponList({ onEdit }) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await couponsApi.list();
      setCoupons(res.data || []);
    } catch (err) {
      console.error('Failed to load coupons', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const filtered = coupons.filter(
    (c) => c.coupon.toLowerCase().includes(q.toLowerCase())
  );

  const handleDeleted = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="list-header">
        <input
          type="text"
          placeholder="Search coupons..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={fetchCoupons} disabled={loading}>
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="coupon-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount %</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <CouponRow key={c.id} coupon={c} onEdit={onEdit} onDeleted={handleDeleted} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
