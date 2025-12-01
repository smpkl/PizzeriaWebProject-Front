
export function validateCoupon({ coupon, discount_percentage, start_date, end_date }) {
  const errors = {};

  if (!coupon || coupon.trim().length < 3) {
    errors.coupon = 'Coupon code must be at least 3 characters';
  }
  const discount = Number(discount_percentage);
  if (Number.isNaN(discount) || discount <= 0 || discount > 100) {
    errors.discount_percentage = 'Discount must be a number between 1 and 100';
  }
  const start = new Date(start_date);
  const end = new Date(end_date);
  if (!(start instanceof Date) || isNaN(start)) {
    errors.start_date = 'Start date is invalid';
  }
  if (!(end instanceof Date) || isNaN(end)) {
    errors.end_date = 'End date is invalid';
  }
  if (!errors.start_date && !errors.end_date && end < start) {
    errors.date_range = 'End date must be after start date';
  }
  return errors;
}
