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

export {useProducts, useAuthentication, useUser};
