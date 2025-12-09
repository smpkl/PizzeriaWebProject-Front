import {useNavigate} from 'react-router';
import {useOrderContext} from '../hooks/contextHooks';

import {BiSolidTruck} from 'react-icons/bi';
import {BiSolidShoppingBags} from 'react-icons/bi';
import {MdDining} from 'react-icons/md';

const OrderTypeButtons = () => {
  const {handleTypeChange, orderType, setIsActiveOrder} = useOrderContext();
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    handleTypeChange(type);
    setIsActiveOrder(true);
    navigate('/order');
  };

  return (
    <>
      <div
        className="order-type-buttons"
        style={{display: 'flex', justifyContent: 'center', padding: '10px'}}
      >
        <div className="ordertype-btn-container">
          <button
            id="delivery"
            onClick={() => handleButtonClick('Delivery')}
            className={`ordertype-btn ${orderType === 'Delivery' ? 'active' : ''}`}
          >
            <BiSolidTruck style={{fontSize: '60px'}} />
          </button>
          <p>DELIVERY</p>
        </div>
        <div className="ordertype-btn-container">
          <button
            id="pick-up"
            onClick={() => handleButtonClick('Pick up')}
            className={`ordertype-btn ${orderType === 'Pick up' ? 'active' : ''}`}
          >
            <BiSolidShoppingBags style={{fontSize: '60px'}} />
          </button>
          <p>PICK UP</p>
        </div>
        <div className="ordertype-btn-container">
          <button
            id="at-pizzeria"
            onClick={() => handleButtonClick('At pizzeria')}
            className={`ordertype-btn ${orderType === 'At pizzeria' ? 'active' : ''}`}
          >
            <MdDining style={{fontSize: '60px'}} />
          </button>
          <p>AT PIZZERIA</p>
        </div>
      </div>
    </>
  );
};

export default OrderTypeButtons;
