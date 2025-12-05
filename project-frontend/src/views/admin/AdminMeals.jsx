// Adminsivun aterioidenhallinta. Myös daily meal lista.
import React, {useEffect, useState} from 'react';
import AdminMealsCard from '../../components/admin/AdminMealCard';
import {useMeals} from '../../hooks/apiHooks';
import NewMealCard from '../../components/admin/NewMealCard';

const AdminMeals = () => {
  const [menuMeals, setMenuMeals] = useState([]);
  const [showModified, setShowModified] = useState(false);
  const [modifyMeal, setModifyMeal] = useState({});
  const {getMeals} = useMeals();

  useEffect(() => {
    const loadData = async () => {
      const meals = await getMeals();
      setMenuMeals(meals);
    };

    loadData();
  }, [modifyMeal]);
  return (
    <div>
      {!showModified &&
        menuMeals.map((item) => (
          <AdminMealsCard
            key={`meal-${item.id}`}
            item={item}
            setModifyMeal={setModifyMeal}
            setShowModified={setShowModified}
          />
        ))}
      {showModified && (
        <NewMealCard
          modifyMeal={modifyMeal}
          setShowModified={setShowModified}
        />
      )}
    </div>
  );
};

export default AdminMeals;
