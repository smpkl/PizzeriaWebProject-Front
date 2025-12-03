import {useState, useEffect} from 'react';
import fetchData from '../utils/fetchData';

const useProducts = () => {
  const getProducts = async () => {
    try {
      const productData = await fetchData(
        'http://127.0.0.1:3000/api/v1/products',
      );
      //console.log('API products: ', productData);
      return productData.products;
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  return {getProducts};
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

const useTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    try {
      const getTags = async () => {
        const response = await fetchData('http://127.0.0.1:3000/api/v1/tags');
        //console.log('Response: ', response);
        setTags(response.tags);
      };
      getTags();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);
  return {tags};
};

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const getCategories = async () => {
        const response = await fetchData(
          'http://127.0.0.1:3000/api/v1/categories',
        );
        //console.log('Response: ', response);
        setCategories(response.categories);
      };
      getCategories();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);
  return {categories};
};

const useMeals = () => {
  const getMeals = async () => {
    try {
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
      //console.log('Meals with products: ', mealsWithProducts);
      return mealsWithProducts;
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  return {getMeals};
};

const useDailyMeal = () => {
  const [dailyMeal, setDailyMeal] = useState(null);

  useEffect(() => {
    try {
      const getDailyMeal = async () => {
        const response = await fetchData(
          'http://127.0.0.1:3000/api/v1/dailymeals/monday',
        );
        const dailymeal = response.dailymeal;
        const productsResponse = await fetchData(
          `http://127.0.0.1:3000/api/v1/meals/${dailymeal.id}/products`,
        );
        //console.log(productsResponse);
        dailymeal.products = productsResponse.products;
        setDailyMeal(response.dailymeal);
      };
      getDailyMeal();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);
  return {dailyMeal};
};

const useOrder = () => {
  const postOrder = async (
    orderInfo,
    orderType,
    orderProducts,
    orderMeals,
    orderPrice,
  ) => {
    try {
      console.log(orderInfo);
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          status: 'received',
          orderType: orderType,
          timeOption: orderInfo.timeOption,
          dateTime: `${orderInfo.day} ${orderInfo.time}`,
          deliveryAddress: `${orderInfo.userAddress} ${orderInfo.userAddress2}`,
          pizzeriaAddress: orderInfo.pizzeriaAddress,
          customerName: orderInfo.name,
          customerPhone: orderInfo.phonenumber,
          customerEmail: orderInfo.email,
          details: orderInfo.details,
          price: orderPrice,
        }),
      };
      const orderResponse = await fetchData(
        'http://127.0.0.1:3000/api/v1/orders',
        options,
      );
      console.log('postOrder', orderResponse);

      const orderId = orderResponse.order_id;

      const mergedProducts = {};

      orderProducts.forEach((item) => {
        const id = item.product.id;

        if (!mergedProducts[id]) {
          mergedProducts[id] = {
            product: item.product,
            quantity: item.quantity,
          };
        } else {
          mergedProducts[id].quantity += item.quantity;
        }
      });

      orderMeals.forEach((mealItem) => {
        const meal = mealItem.meal;
        const mealQty = meal.quantity ?? 1;

        meal.products.forEach((prod) => {
          const id = prod.id;

          if (!mergedProducts[id]) {
            mergedProducts[id] = {
              product: prod,
              quantity: mealQty,
            };
          } else {
            mergedProducts[id].quantity += mealQty;
          }
        });
      });

      console.log('Merged: ', mergedProducts);
      const finalProducts = Object.values(mergedProducts);

      console.log(finalProducts);

      finalProducts.forEach(async (p) => {
        console.log(p);
        const options2 = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            product_id: p.product.id,
            quantity: p.quantity,
          }),
        };
        const orderProductsResponse = await fetchData(
          `http://127.0.0.1:3000/api/v1/orders/${orderId}/products`,
          options2,
        );
        console.log(orderProductsResponse);
      });

      return orderId;
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  return {postOrder};
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
  useTags,
  useCategories,
  useDailyMeal,
  useMeals,
  useAuthentication,
  useUser,
  useOrder,
};
