// Päänäkymä/Home/Main

import MenuFilter from '../../components/MenuFilter';
import MenuItem from '../../components/MenuItem';
import {useProducts} from '../../hooks/apiHooks';

const Home = () => {
  const {menuItems} = useProducts();

  return (
    <>
      <h1>MAIN</h1>
      <div id="main-page-img-container">
        <img
          src="https://placehold.co/400x200/red/white?text=THIS+IS+A+PIZZA"
          alt="A very delicious pizza"
        />
      </div>
      <div id="start-order-box"></div>
      <div id="announcement"></div>
      <div id="meal-of-the-day"></div>
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
