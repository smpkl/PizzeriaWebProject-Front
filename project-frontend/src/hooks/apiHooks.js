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

      console.log(options);

      try {
        await fetchData(productUrl + `/${productId}/tags`, options);
      } catch (error) {
        console.log(error);
      }
    });
  };


  const syncProductTags = async (
    productId,
    newTagIds = [],
    originalTagIds = [],
  ) => {
    const toAdd = newTagIds.filter((id) => !originalTagIds.includes(id));
    const toRemove = originalTagIds.filter((id) => !newTagIds.includes(id));

    for (const tagId of toAdd) {
      const body = {tag_id: tagId};
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      try {
        await fetchData(`${productUrl}/${productId}/tags`, options);
      } catch (error) {
        console.log('ERROR adding tag', error);
      }
    }

    for (const tagId of toRemove) {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await fetchData(`${productUrl}/${productId}/tags/${tagId}`, options);
      } catch (error) {
        console.log('ERROR removing tag', error);
      }
    }

    return {added: toAdd, removed: toRemove};
  };

  const putProduct = async (
    productId,
    inputs,
    newTagIds = [],
    originalTagIds = [],
    image = null,
  ) => {
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
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    console.log(options)

    try {
      const url = `${productUrl}/${productId}`;
      const putResult = await fetchData(url, options);
      if (!putResult) {
        return false;
      }

      await syncProductTags(productId, newTagIds, originalTagIds);

      return putResult;
    } catch (error) {
      console.log('ERROR updating product', error);
      return false;
    }
  };

  const deleteProduct = async (productId) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `${productUrl}/${productId}`;
      const deleteResult = await fetchData(url, options);
      if (deleteResult) {
        return deleteResult;
      } else {
        return false;
      }
    } catch (error) {
      console.log('ERROR deleting product', error);
      return false;
    }
  };

  return {getProducts, postProduct, postProductTag, putProduct, deleteProduct};
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

const usePizzerias = () => {
  const [pizzerias, setPizzerias] = useState([]);

  useEffect(() => {
    try {
      const getPizzerias = async () => {
        const response = await fetchData(
          'http://127.0.0.1:3000/api/v1/locations',
        );
        //console.log(response);
        setPizzerias(response.locations);
      };
      getPizzerias();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);
  return {pizzerias};
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
      //console.log(orderInfo);
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
          price: (orderPrice + Number(orderInfo.deliveryFee)).toFixed(2),
        }),
      };
      const orderResponse = await fetchData(
        'http://127.0.0.1:3000/api/v1/orders',
        options,
      );
      //console.log('postOrder', orderResponse);

      const orderId = orderResponse.order_id;

      // Collect all the products from the orderProducts and orderMeals to an object:
      const mergedProducts = {};

      // Go through the orderProducts:
      orderProducts.forEach((item) => {
        // Each product id is the key for the main object:
        const id = item.product.id;

        // If there are no keys with same value already in the main object, create a new key and give it a value of two key-value pairs:
        if (!mergedProducts[id]) {
          mergedProducts[id] = {
            product: item.product,
            quantity: item.quantity,
          };
        } // If key already exists, raise the quantity:
        else {
          mergedProducts[id].quantity += item.quantity;
        }
      });

      // Do the same to all the meals:
      orderMeals.forEach((mealItem) => {
        const meal = mealItem.meal;
        const mealQty = meal.quantity ?? 1;

        // Go through each product in the meal:
        meal.products.forEach((prod) => {
          const id = prod.id;

          // If product key does not exist, make it:
          if (!mergedProducts[id]) {
            mergedProducts[id] = {
              product: prod,
              quantity: mealQty,
            };
          } //If it does, raise quantity
          else {
            mergedProducts[id].quantity += mealQty;
          }
        });
      });

      const finalProducts = Object.values(mergedProducts);

      //console.log('Merged: ', mergedProducts);
      //console.log(finalProducts);

      finalProducts.forEach(async (p) => {
        //console.log(p);
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
        //console.log(orderProductsResponse);
      });

      return orderId;
    } catch (error) {
      console.log('ERROR', error);
      throw error;
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
  usePizzerias,
  useTags,
  useCategories,
  useDailyMeal,
  useMeals,
  useAuthentication,
  useUser,
  useOrder,
};
