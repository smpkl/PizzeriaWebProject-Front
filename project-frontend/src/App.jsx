import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router';
import Layout from './components/Layout';
import Home from './views/general/Home';
import AboutUs from './views/general/AboutUs';
import Order from './views/general/Order';
import Profile from './views/general/Profile';
import AdminOrders from './views/admin/AdminOrders';
import AdminLayout from './components/AdminLayout';

const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>
          {/* Admin sivut, placeholder kunnes keksitää yhessä miten lopulta toteutetaa */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<AdminOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
