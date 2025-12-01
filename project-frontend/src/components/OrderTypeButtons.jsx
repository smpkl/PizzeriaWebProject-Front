import {useOrderContext} from '../hooks/contextHooks';

const OrderTypeButtons = () => {
  const {handleTypeChange, orderType} = useOrderContext();

  return (
    <>
      <div className="order-type-buttons">
        <button
          id="delivery"
          onClick={() => handleTypeChange('delivery')}
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
          onClick={() => handleTypeChange('pick-up')}
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
          onClick={() => handleTypeChange('at-pizzeria')}
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
