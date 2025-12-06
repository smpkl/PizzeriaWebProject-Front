import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';

import Announcement from '../../components/Announcement';
import MealItem from '../../components/MealItem';
import MenuFilter from '../../components/MenuFilter';
import MenuItem from '../../components/MenuItem';
import OrderTypeButtons from '../../components/OrderTypeButtons';
import {
  useProducts,
  useAnnouncements,
  useDailyMeal,
  useMeals,
  useTags,
  useCategories,
} from '../../hooks/apiHooks';

const Home = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const location = useLocation();

  const {announcements} = useAnnouncements();
  const {tags} = useTags();
  const {categories} = useCategories();
  const {dailyMeal} = useDailyMeal();

  const [originalProducts, setOriginalProducts] = useState([]);
  const [originalMeals, setOriginalMeals] = useState([]);

  // filtteröidyt listat
  const [menuProducts, setMenuProducts] = useState([]);
  const [menuMeals, setMenuMeals] = useState([]);

  const {getProducts} = useProducts();
  const {getMeals} = useMeals();

  const updateMenu = (products, meals) => {
    setMenuProducts(products);
    setMenuMeals(meals);
  };

  useEffect(() => {
    const loadData = async () => {
      const products = await getProducts();
      const meals = await getMeals();
      setOriginalProducts(products);
      setOriginalMeals(meals);
      setMenuProducts(products);
      setMenuMeals(meals);
    };

    loadData();
  }, []);

  // Scroll the view to menu when user has clicked "Back to shopping" -button in Order-view:
  useEffect(() => {
    if (location.state?.scrollToMenu) {
      if (menuProducts.length > 0 || menuMeals.length > 0) {
        const menuElement = document.getElementById('menu-container');
        if (menuElement) {
          menuElement.scrollIntoView({behavior: 'smooth'});
          navigate(location.pathname, {replace: true, state: {}}); // Reset the state so that the view does not scroll when the view is reloaded.
        }
      }
    }
  }, [location, menuProducts, menuMeals]);

  // Set a welcome message after user has logged in or a "user registered" message after user has successfully registered:
  useEffect(() => {
    if (location.state?.success) {
      setMessage(location.state.success);
      navigate(location.pathname, {replace: true, state: {}}); // Reset the state
    }
  }, [location.state]);

  return (
    <>
      {message && (
        <p
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            backgroundColor: 'darkgoldenrod',
            padding: '10px 0',
          }}
        >
          {message}
        </p>
      )}
      <h1>PIZZERIA TBA</h1>
      <div id="main-page-img-container">
        <img
          src="https://placehold.co/400x200/red/white?text=THIS+IS+A+PIZZA"
          alt="A very delicious pizza"
        />
      </div>
      <div id="start-order-box">
        <h2>Start Order</h2>
        <OrderTypeButtons />
      </div>
      <div id="announcements">
        {announcements.map((item) => (
          <Announcement key={item.id} announcement={item} />
        ))}
      </div>
      <div id="meal-of-the-day" style={{backgroundColor: 'goldenrod'}}>
        <h2>Meal of the Day</h2>
        {dailyMeal && <MealItem key={dailyMeal.id} item={dailyMeal} />}
      </div>
      <div id="menu-container">
        <h2>MENU</h2>
        <MenuFilter
          products={originalProducts}
          meals={originalMeals}
          tags={tags}
          categories={categories}
          updateMenu={updateMenu}
        />
        <div id="menu">
          {menuProducts.map((item) => (
            <MenuItem key={`product-${item.id}`} item={item} />
          ))}
          {menuMeals.map((item) => (
            <MealItem key={`meal-${item.id}`} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
