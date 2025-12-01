
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/Home/HomePage';
import CouponsPage from '../pages/Coupons/CouponsPage';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'coupons', element: <CouponsPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
