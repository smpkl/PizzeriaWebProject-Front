import {useState, useEffect} from 'react';
import {useOrderContext} from './contextHooks';

const useOrderForm = (callback) => {
  const {orderInfo, handleOrderInfoChange} = useOrderContext();

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback(orderInfo);
  };

  const handleInputChange = (event) => {
    handleOrderInfoChange({
      [event.target.name]: event.target.value,
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    orderInfo,
  };
};

export {useOrderForm};
