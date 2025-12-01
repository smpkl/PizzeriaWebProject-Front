//--Work in ProgressEvent/test--

import http from '../services/httpClient';

// Adjust paths to match backend (e.g., /coupons or /coupon)
export const couponsApi = {
  list: () => http.get('/coupons'),
  getById: (id) => http.get(`/coupons/${id}`),
  create: (payload) => http.post('/coupons', payload),
  update: (id, payload) => http.put(`/coupons/${id}`, payload),
  remove: (id) => http.delete(`/coupons/${id}`),
};
