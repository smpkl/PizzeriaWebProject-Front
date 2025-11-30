// Päänäkymä/Home/Main

import {useEffect, useState} from 'react';
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

  const {announcements} = useAnnouncements();
  const {tags} = useTags();
  const {categories} = useCategories();
  const {dailyMeal} = useDailyMeal();

  return (
    <>
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
          <Announcement
            key={item.id}
            announcement={item}
            //setSelectedItem={setSelectedItem}
          />
        ))}
      </div>
      <div id="meal-of-the-day" style={{backgroundColor: 'goldenrod'}}>
        <h2>Meal of the Day</h2>
        {dailyMeal && <MenuItem key={dailyMeal.id} item={dailyMeal} />}
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
            <MenuItem
              key={item.id}
              item={item}
              //setSelectedItem={setSelectedItem}
            />
          ))}
          {menuMeals.map((item) => (
            <MealItem
              key={item.id}
              item={item}
              //setSelectedItem={setSelectedItem}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
