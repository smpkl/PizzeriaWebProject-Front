import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router';
import Layout from './components/Layout';
import Home from './views/general/Home';
import AboutUs from './views/general/AboutUs';
import Order from './views/general/Order';
import CheckOut from './views/general/Checkout';
import Profile from './views/general/Profile';
import AdminOrders from './views/admin/AdminOrders';
import AdminLayout from './components/admin/AdminLayout';
import AdminMain from './views/admin/AdminMain';
import AdminProducts from './views/admin/AdminProducts';
import {OrderProvider} from './contexts/OrderContext';
import AdminLogin from './views/admin/AdminLogin';
//import AdminAnouncements from './views/admin/AdminAnnouncements';
//import AdminCoupons from './views/admin/AdminCoupons';
import AdminMeals from './views/admin/AdminMeals';
//import AdminFeedbacks from './views/admin/AdminFeedbacks';
import AdminProfile from './views/admin/AdminProfile';
import {UserProvider} from './contexts/UserContext';
import {AdminProvider} from './contexts/AdminContext';

const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AdminProvider>
          <UserProvider>
            <OrderProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/checkout" element={<CheckOut />} />
                  <Route path="/about" element={<AboutUs />} />
                </Route>
                {/* Admin sivut, placeholder kunnes keksitää yhessä miten lopulta toteutetaa */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminMain />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  {/*<Route
                    path="/admin/announcements"
                    element={<AdminAnouncements />}
                  /> */}
                  {/*<Route path="/admin/coupons" element={<AdminCoupons />} /> */}
                  <Route path="/admin/meals" element={<AdminMeals />} />
                  {/* aktivoi kun exporttaa myös jtn: */}
                  {/* <Route path="/admin/feedbacsk" element={<AdminFeedbacks />} /> */}
                  <Route path="/admin/profile" element={<AdminProfile />} />
                </Route>
              </Routes>
            </OrderProvider>
          </UserProvider>
        </AdminProvider>
      </BrowserRouter>
    </>
  );
};
export default App;
