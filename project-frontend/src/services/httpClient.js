import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token if you have login later.
// http.interceptors.request.use((config) => { /* attach token */ return config; });

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // Centralized error logging
    console.error('API Error:', err?.response?.status, err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default http;
