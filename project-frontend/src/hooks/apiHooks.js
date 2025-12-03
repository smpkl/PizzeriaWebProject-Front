import {useState, useEffect} from 'react';
import fetchData from '../utils/fetchData';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJmaXJzdG5hbWUiOiJOZXcxIiwibGFzdG5hbWUiOiJBZG1pbjIzIiwiZW1haWwiOiJuZXdhZG1pbisxMTE3NjQ2NjkzNjI4NzZAZXhhbXBsZS5jb20iLCJhZGRyZXNzIjoiQWRtaW4gc3RyZWV0IDIsIEhlbHNpbmtpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY0NzU3MjI5LCJleHAiOjE3NjQ4NDM2Mjl9.YYXIDfiSj3Cc8iOVDVf7xeqJjIVqQRBBKAF5Wl3SiFY';

const useProducts = () => {
  const productUrl = 'http://127.0.0.1:3000/api/v1/products';
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

  const postProduct = async (inputs, checkbox, image) => {
    const {price, name, category, ingredients, description} = inputs;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', parseFloat(price));
    formData.append('category', parseInt(category));
    formData.append('ingredients', ingredients);
    formData.append('description', description);

    if (image) {
      formData.append('file', image);
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      console.log(productUrl);
      const postProductData = await fetchData(productUrl, options);
      if (postProductData) {
        return postProductData;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const postProductTag = async (tags, productId) => {
    tags.forEach(async (element) => {
      const postBody = {
        tag_id: element,
      };

      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      };

      console.log(options)

      try {
        await fetchData(productUrl + `/${productId}/tags`, options);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return {getProducts, postProduct, postProductTag};
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
        //console.log(response);
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
  const postOrder = async () => {
    try {
      /*const response = await fetchData('http://127.0.0.1:3000/api/v1/meals');
      const meals = response.meals;
      //console.log(response);
      const mealsWithProducts = await Promise.all(
        meals.map(async (item) => {
          const productsResponse = await fetchData(
            `http://127.0.0.1:3000/api/v1/meals/${item.id}/products`,
          );
          return {...item, products: productsResponse.products};
        }),
      ); */
      console.log('postOrder');
      return;
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
