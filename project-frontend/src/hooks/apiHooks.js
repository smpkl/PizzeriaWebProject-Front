import {useState, useEffect} from 'react';
import fetchData from '../utils/fetchData';

//const token = import.meta.env.VITE_ADMIN_TOKEN;
//const adminToken = localStorage.getItem('admintoken'); <-- Ei toimi koska adminTokenia ei haeta uudestaan ensimmäisen kerrna jälkeen, eli ei ole oikea
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useProducts = () => {
  const productUrl = baseUrl + 'products';
  const getProducts = async () => {
    try {
      const productData = await fetchData(productUrl);
      //console.log('API products: ', productData);
      return productData.products;
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const postProduct = async (inputs, checkbox, image) => {
    const {price, name, category, ingredients, description} = inputs;
    const adminToken = localStorage.getItem('adminToken');

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
        Authorization: `Bearer ${adminToken}`,
      },
      body: formData,
    };

    try {
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
    const adminToken = localStorage.getItem('adminToken');

    tags.forEach(async (element) => {
      const postBody = {
        tag_id: element,
      };

      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      };

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
    const adminToken = localStorage.getItem('adminToken');

    const toAdd = newTagIds.filter((id) => !originalTagIds.includes(id));
    const toRemove = originalTagIds.filter((id) => !newTagIds.includes(id));

    for (const tagId of toAdd) {
      const body = {tag_id: tagId};
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
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
          Authorization: `Bearer ${adminToken}`,
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
    const adminToken = localStorage.getItem('adminToken');

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
        Authorization: `Bearer ${adminToken}`,
      },
      body: formData,
    };

    console.log(options);

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
    const adminToken = localStorage.getItem('adminToken');
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${adminToken}`,
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
  const announcementsUrl = baseUrl + 'announcements/';
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    try {
      const getAnnouncements = async () => {
        const response = await fetchData(announcementsUrl);
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
        // vanha url = 'http://127.0.0.1:3000/api/v1/locations'
        const response = await fetchData(baseUrl + 'locations');
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
  const tagsUrl = baseUrl + 'tags';
  const [tags, setTags] = useState([]);

  useEffect(() => {
    try {
      const getTags = async () => {
        const response = await fetchData(tagsUrl);
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
  const categoriesUrl = baseUrl + 'categories';
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const getCategories = async () => {
        const response = await fetchData(categoriesUrl);
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
  const mealsUrl = baseUrl + 'meals';
  const getMeals = async () => {
    try {
      const weekday = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];

      const d = new Date();
      let day = weekday[d.getDay()];

      const response = await fetchData(mealsUrl);
      const meals = response.meals;

      const dailymealResponse = await fetchData(`${baseUrl}dailymeals/${day}`);
      const dailymeal = dailymealResponse.dailymeal;

      meals.forEach((m) => {
        if (m.id === dailymeal.id) {
          m.oldPrice = m.price;
          m.price = (Number(m.price) * 0.85).toFixed(2);
        }
      });

      const mealsWithProducts = await Promise.all(
        meals.map(async (item) => {
          const productsResponse = await fetchData(
            `${mealsUrl}/${item.id}/products`,
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

  const postMeal = async (inputs, image) => {
    const {name, price} = inputs;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', parseFloat(price));

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
      const response = await fetchData(mealsUrl, options);
      const mealId = response?.result?.mealId;
      if (mealId) return mealId;
      else return false;
    } catch (error) {
      console.log('ERROR creating meal', error);
      return false;
    }
  };

  const putMeal = async (mealId, inputs, image) => {
    const {name, price} = inputs;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', parseFloat(price));

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

    try {
      const response = await fetchData(`${mealsUrl}/${mealId}`, options);
      return !!response;
    } catch (error) {
      console.log('ERROR updating meal', error);
      return false;
    }
  };

  const syncMealProducts = async (
    mealId,
    newProductIds = [],
    originalProductIds = [],
  ) => {
    const toAdd = newProductIds.filter(
      (id) => !originalProductIds.includes(id),
    );
    const toRemove = originalProductIds.filter(
      (id) => !newProductIds.includes(id),
    );

    for (const productId of toAdd) {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({product_id: productId}),
      };

      try {
        await fetchData(`${mealsUrl}/${mealId}/products`, options);
      } catch (error) {
        console.log('ERROR adding meal product', error);
      }
    }

    for (const productId of toRemove) {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        await fetchData(`${mealsUrl}/${mealId}/products/${productId}`, options);
      } catch (error) {
        console.log('ERROR removing meal product', error);
      }
    }

    return {added: toAdd, removed: toRemove};
  };

  const deleteMeal = async (mealId) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetchData(`${mealsUrl}/${mealId}`, options);
      //returns true if truthy false if falsy. Like "double negative"
      return !!response;
    } catch (error) {
      console.log('ERROR deleting meal', error);
      return false;
    }
  };

  return {getMeals, postMeal, putMeal, deleteMeal, syncMealProducts};
};

const useDailyMeal = () => {
  const [dailyMeal, setDailyMeal] = useState(null);

  useEffect(() => {
    try {
      const weekday = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];

      const d = new Date();
      let day = weekday[d.getDay()];

      const getDailyMeal = async () => {
        const response = await fetchData(`${baseUrl}dailymeals/${day}`);
        const dailymeal = response.dailymeal;
        const productsResponse = await fetchData(
          `${baseUrl}meals/${dailymeal.id}/products`,
        );
        //console.log(productsResponse);
        dailymeal.oldPrice = dailymeal.price;
        dailymeal.price = (Number(dailymeal.price) * 0.85).toFixed(2);
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
  const adminToken = localStorage.getItem('adminToken');
  const ordersUrl = baseUrl + 'orders';

  const getOrders = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
    try {
      const orders = await fetchData(ordersUrl, options);
      if (orders) return orders;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getOrderProducts = async (orderId) => {
    const orderProductUrl = ordersUrl + `/${orderId}/products`;
    try {
      const orderProducts = await fetchData(orderProductUrl);
      if (orderProducts) return orderProducts;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getOrdersByUserId = async (userId, token) => {
    //const userOrdersUrl = ordersUrl + `/user/${userId}`;
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const orders = await fetchData(`${ordersUrl}/user/${userId}`, options);
      const ordersWithProducts = await Promise.all(
        orders.orders.map(async (order) => {
          const productsResponse = await fetchData(
            `${ordersUrl}/${order.id}/products`,
          );
          return {...order, products: productsResponse.products};
        }),
      );
      return ordersWithProducts;
    } catch (error) {
      console.log(error);
    }
  };

  const postOrder = async (
    orderInfo,
    orderType,
    orderUserId,
    orderProducts,
    orderMeals,
    orderPrice,
  ) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          status: 'received',
          orderType: orderType,
          userId: orderUserId,
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
      const orderResponse = await fetchData(ordersUrl, options);
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

      finalProducts.forEach(async (p) => {
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
        await fetchData(`${ordersUrl}/${orderId}/products`, options2);
      });

      return orderId;
    } catch (error) {
      console.log('ERROR', error);
      throw error;
    }
  };

  /**
   *
   * @param {*} orderId order which is wanted to upgrade
   * @param {*} body object of values that wanted to upgrade i.e. {"status": "cancelled"}
   * @returns true if passes, false if some failure
   */

  const putOrder = async (orderId, body) => {
    const putUrl = ordersUrl + `/${orderId}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      const updatedOrder = await fetchData(putUrl, options);
      if (updatedOrder) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return {postOrder, getOrders, getOrderProducts, getOrdersByUserId, putOrder};
};

const useAuthentication = () => {
  const userUrl = baseUrl + 'users';
  const postUserLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      `${baseUrl}auth/user/login`,
      fetchOptions,
    );
    return loginResult;
  };

  const postAdminLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      `${baseUrl}auth/admin/login`,
      fetchOptions,
    );
    return loginResult;
  };

  return {postUserLogin, postAdminLogin};
};

const useUser = () => {
  const getCurrentUser = async (token) => {
    try {
      const options = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const tokenResults = await fetchData(`${baseUrl}users/me`, options);
      return tokenResults;
    } catch (error) {
      console.log(error);
    }
  };

  const postUser = async (inputs) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          first_name: inputs.firstname,
          last_name: inputs.lastname,
          email: inputs.email,
          phonenumber: inputs.phonenumber,
          address: inputs.address,
          password: inputs.password,
        }),
      };
      const registerResults = await fetchData(`${baseUrl}users`, options);
      return registerResults;
    } catch (error) {
      console.log('ERROR: ', error);
      throw error;
    }
  };

  const putUser = async (inputs, token, userId) => {
    try {
      console.log(inputs.password);
      // Backend validations do not accept fields with empty values (missing fields are fine) so update requests are done like this:
      // If the update is not for password (all the other info can be gotten from user in frontend):
      if (!inputs.password) {
        const options = {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            first_name: inputs.firstname,
            last_name: inputs.lastname,
            email: inputs.email,
            phonenumber: inputs.phonenumber,
            address: inputs.address,
          }),
        };
        const updateResults = await fetchData(
          `http://127.0.0.1:3000/api/v1/users/${userId}`,
          options,
        );
        return updateResults;
        // If the update is for password (password info is not included in frontend user):
      } else {
        const options2 = {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            password: inputs.password,
          }),
        };
        const updateResults2 = await fetchData(
          `http://127.0.0.1:3000/api/v1/users/${userId}`,
          options2,
        );
        return updateResults2;
      }
    } catch (error) {
      console.log('ERROR: ', error);
      throw error;
    }
  };

  return {getCurrentUser, postUser, putUser};
};

const useAdmin = () => {
  const getCurrentAdmin = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const options = {
        headers: {
          Authorization: 'Bearer ' + adminToken,
        },
      };
      const tokenResults = await fetchData(`${baseUrl}users/me`, options);
      return tokenResults;
    } catch (error) {
      console.log(error);
    }
  };

  const postAdmin = async (inputs) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + adminToken,
        },
        body: JSON.stringify({
          first_name: inputs.firstname,
          last_name: inputs.lastname,
          email: inputs.email,
          phonenumber: inputs.phonenumber,
          address: inputs.address,
          password: inputs.password,
        }),
      };
      const registerResults = await fetchData(`${baseUrl}users/admin`, options);
      return registerResults;
    } catch (error) {
      console.log('ERROR: ', error);
      throw error;
    }
  };

  return {getCurrentAdmin, postAdmin};
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
  useAdmin,
  useOrder,
};
