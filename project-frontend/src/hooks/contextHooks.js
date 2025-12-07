import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';
import {OrderContext} from '../contexts/OrderContext';
import {AdminContext} from '../contexts/AdminContext';

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  return context;
};

const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
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

export {useOrderContext, useAdminContext, useUserContext};
