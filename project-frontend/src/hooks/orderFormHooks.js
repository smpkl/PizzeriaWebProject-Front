import {useState, useEffect} from 'react';
import {useOrderContext} from './contextHooks';

const useOrderForm = (callback) => {
  const {orderInfo, handleOrderInfoChange} = useOrderContext();

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault;
    }
    callback(orderInfo);
  };

  const handleInputChange = (event) => {
    console.log(event);
    if (event.target.name === 'timeOption' && event.target.value === 'now') {
      handleOrderInfoChange({timeOption: 'now'});

      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());
      handleOrderInfoChange({day: `${year}-${month}-${day}`});

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      handleOrderInfoChange({time: `${hours}:${minutes}`});
      return;
    }

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
