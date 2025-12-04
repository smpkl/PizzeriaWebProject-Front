import {useNavigate} from 'react-router';
import {useOrderContext} from '../hooks/contextHooks';

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
      <div className="order-type-buttons">
        <button
          id="delivery"
          onClick={() => handleButtonClick('Delivery')}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
          className={orderType === 'Delivery' ? 'active' : ''}
        >
          Delivery
        </button>
        <button
          id="pick-up"
          onClick={() => handleButtonClick('Pick up')}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
          className={orderType === 'Pick up' ? 'active' : ''}
        >
          Pick Up
        </button>
        <button
          id="at-pizzeria"
          onClick={() => handleButtonClick('At pizzeria')}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
          className={orderType === 'At pizzeria' ? 'active' : ''}
        >
          At Pizzeria
        </button>
      </div>
    </>
  );
};

export default OrderTypeButtons;
