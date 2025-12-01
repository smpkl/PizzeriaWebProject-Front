import {useNavigate} from 'react-router';
import {useOrderContext} from '../hooks/contextHooks';

const OrderTypeButtons = () => {
  const {handleTypeChange, orderType} = useOrderContext();
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    handleTypeChange(type);
    navigate('/order');
  };

  return (
    <>
      <div className="order-type-buttons">
        <button
          id="delivery"
          onClick={() => handleButtonClick('delivery')}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
          className={orderType === 'delivery' ? 'active' : ''}
        >
          Delivery
        </button>
        <button
          id="pick-up"
          onClick={() => handleButtonClick('pick-up')}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
          className={orderType === 'pick-up' ? 'active' : ''}
        >
          Pick Up
        </button>
        <button
          id="at-pizzeria"
          onClick={() => handleButtonClick('at-pizzeria')}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
          className={orderType === 'at-pizzeria' ? 'active' : ''}
        >
          At Pizzeria
        </button>
      </div>
    </>
  );
};

export default OrderTypeButtons;
