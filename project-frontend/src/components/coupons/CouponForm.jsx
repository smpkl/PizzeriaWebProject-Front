
import React, { useEffect, useState } from 'react';
import { validateCoupon } from '../../utils/validation';
import { couponsApi } from '../../api/couponsApi';
import './coupons.css';

export default function CouponForm({ onSaved, initial }) {
  const [form, setForm] = useState({
    coupon: '',
    discount_percentage: '',
    start_date: '',
    end_date: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        coupon: initial.coupon ?? '',
        discount_percentage: initial.discount_percentage ?? '',
        start_date: (initial.start_date || '').slice(0, 10),
        end_date: (initial.end_date || '').slice(0, 10),
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validateCoupon({
      ...form,
      discount_percentage: Number(form.discount_percentage),
    });
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    try {
      const payload = {
        coupon: form.coupon.trim(),
        discount_percentage: Number(form.discount_percentage),
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString(),
      };

      if (initial?.id) {
        await couponsApi.update(initial.id, payload);
      } else {
        await couponsApi.create(payload);
      }
      onSaved?.();
      setForm({ coupon: '', discount_percentage: '', start_date: '', end_date: '' });
    } catch (err) {
      setErrors({ api: err?.response?.data?.message || 'Failed to save coupon' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="coupon-form" onSubmit={handleSubmit}>
      <div className="row">
        <label>Coupon Code</label>
        <input
          name="coupon"
          type="text"
          value={form.coupon}
          onChange={handleChange}
          placeholder="e.g., PIZZA10"
          required
        />
        {errors.coupon && <span className="error">{errors.coupon}</span>}
      </div>

      <div className="row">
        <label>Discount (%)</label>
        <input
          name="discount_percentage"
          type="number"
          min="1" max="100" step="1"
          value={form.discount_percentage}
          onChange={handleChange}
          placeholder="e.g., 10"
          required
        />
        {errors.discount_percentage && <span className="error">{errors.discount_percentage}</span>}
      </div>

      <div className="row">
        <label>Start Date</label>
        <input
          name="start_date"
          type="date"
          value={form.start_date}
          onChange={handleChange}
          required
        />
        {errors.start_date && <span className="error">{errors.start_date}</span>}
      </div>

      <div className="row">
        <label>End Date</label>
        <input
          name="end_date"
          type="date"
          value={form.end_date}
          onChange={handleChange}
          required
        />
        {errors.end_date && <span className="error">{errors.end_date}</span>}
      </div>

      {errors.date_range && <div className="error">{errors.date_range}</div>}
      {errors.api && <div className="error">{errors.api}</div>}

      <button type="submit" disabled={submitting}>
        {initial?.id ? 'Update Coupon' : 'Add Coupon'}
      </button>
    </form>
  );
}
