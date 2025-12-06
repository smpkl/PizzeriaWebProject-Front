import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';
import {OrderContext} from '../contexts/OrderContext';

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  return context;
};

const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }

  return context;
};

export {useOrderContext, useUserContext};
