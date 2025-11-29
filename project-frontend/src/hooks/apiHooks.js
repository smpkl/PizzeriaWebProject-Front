import {useState, useEffect} from 'react';
import fetchData from '../utils/fetchData';

const useProducts = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    try {
      const getProducts = async () => {
        const productData = await fetchData(
          'http://127.0.0.1:3000/api/v1/products',
        );
        setMenuItems(productData.products);
      };
      getProducts();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);
  return {menuItems};
};

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    try {
      const getAnnouncements = async () => {
        const response = await fetchData(
          'http://127.0.0.1:3000/api/v1/announcements',
        );
        //console.log(response.results);
        setAnnouncements(response.results);
      };
      getAnnouncements();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);
  return {announcements};
};

const useMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    try {
      const getMeals = async () => {
        const response = await fetchData('http://127.0.0.1:3000/api/v1/meals');
        const meals = response.meals;
        //console.log(response);
        const mealsWithProducts = await Promise.all(
          meals.map(async (item) => {
            const productsResponse = await fetchData(
              `http://127.0.0.1:3000/api/v1/meals/${item.id}/products`,
            );
            return {...item, products: productsResponse.products};
          }),
        );
        console.log('Meals with products: ', mealsWithProducts);
        setMeals(mealsWithProducts);
      };
      getMeals();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);
  return {meals};
};

const useDailyMeal = () => {
  const [dailyMeal, setDailyMeal] = useState(null);

  useEffect(() => {
    try {
      const getDailyMeal = async () => {
        const response = await fetchData(
          'http://127.0.0.1:3000/api/v1/dailymeals/monday',
        );
        console.log(response);
        setDailyMeal(response.dailymeal);
      };
      getDailyMeal();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);
  return {dailyMeal};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(url, fetchOptions);
    return loginResult;
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    //const tokenResults = await fetchData(url, options);
    //return tokenResults;
  };

  const postUser = async (inputs) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      //const registerResults = await fetchData(url, options);
      //return registerResults;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return {getUserByToken, postUser};
};

export {
  useProducts,
  useAnnouncements,
  useDailyMeal,
  useMeals,
  useAuthentication,
  useUser,
};
