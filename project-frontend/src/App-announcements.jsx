
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './theme.css';

export default function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/coupons">Coupons</Link>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
