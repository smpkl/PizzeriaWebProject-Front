// Adminsivun aterioidenhallinta. Myös daily meal lista.
import React, {useEffect, useState} from 'react';
import AdminMealsCard from '../../components/admin/AdminMealCard';
import {useMeals} from '../../hooks/apiHooks';
import NewMealCard from '../../components/admin/NewMealCard';
import '../../admincss/admin.css';

const AdminMeals = () => {
  const [menuMeals, setMenuMeals] = useState([]);
  const [showModified, setShowModified] = useState(false);
  const [addMeal, setAddMeal] = useState(false);
  const [modifyMeal, setModifyMeal] = useState({});
  const [deleteAction, setDeleteAction] = useState(false);
  const {getMeals} = useMeals();

  const handleAddMeal = () => {
    setModifyMeal(null);
    setShowModified(false);
    setAddMeal(true);
  };

  useEffect(() => {
    const loadData = async () => {
      const meals = await getMeals();
      setMenuMeals(meals);
    };

    loadData();
  }, [modifyMeal, addMeal, showModified, deleteAction]);
  return (
    <div>
      {!showModified && !addMeal && (
        <>
          <div className="admin-meals__toolbar">
            <button onClick={handleAddMeal}>Add new meal</button>
          </div>
          {menuMeals?.map((item) => (
            <AdminMealsCard
              key={`meal-${item.id}`}
              item={item}
              setModifyMeal={setModifyMeal}
              setShowModified={setShowModified}
              deleteAction={deleteAction}
              setDeleteAction={setDeleteAction}
            />
          ))}
        </>
      )}
      {addMeal && <NewMealCard addMeal={addMeal} setAddMeal={setAddMeal} />}
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
