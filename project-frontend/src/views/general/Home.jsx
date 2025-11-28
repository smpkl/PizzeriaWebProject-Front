// Päänäkymä/Home/Main

import Announcement from '../../components/Announcement';
import MenuFilter from '../../components/MenuFilter';
import MenuItem from '../../components/MenuItem';
import OrderTypeButtons from '../../components/OrderTypeButtons';
import {
  useProducts,
  useAnnouncements,
  useDailyMeal,
} from '../../hooks/apiHooks';

const Home = () => {
  const {menuItems} = useProducts();
  const {announcements} = useAnnouncements();
  const {dailyMeal} = useDailyMeal();
  console.log('Dailymeal: ', dailyMeal);
  return (
    <>
      <h1>MAIN</h1>
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
        <MenuFilter />
        <div id="menu">
          {menuItems.map((item) => (
            <MenuItem
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
