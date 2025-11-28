// Pizzerian info sivu (esittely, kartta, lomake, yhteystiedot)
const OrderTypeButtons = () => {
  return (
    <>
      <div className="order-type-buttons">
        <button
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
        >
          Delivery
        </button>
        <button
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
        >
          Pick Up
        </button>
        <button
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '2%',
          }}
        >
          At Pizzeria
        </button>
      </div>
    </>
  );
};

export default OrderTypeButtons;
