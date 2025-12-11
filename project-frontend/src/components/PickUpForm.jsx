import {useNavigate} from 'react-router';
import {useOrderContext} from '../hooks/contextHooks';
import {useOrderForm} from '../hooks/orderFormHooks';
import {usePizzerias} from '../hooks/apiHooks';
import {useEffect, useState} from 'react';

//import {pizzerias} from '../mock-data/pizzeriaLocations';

const PickUpForm = () => {
  const [filteredPizzerias, setFilteredPizzeria] = useState([]);
  const [key, setKey] = useState(null);
  const [error, setError] = useState('');

  const {pizzerias} = usePizzerias();
  const navigate = useNavigate();
  const {orderInfo, handleOrderInfoChange} = useOrderContext();

  useEffect(() => {
    handleOrderInfoChange({
      userAddress: 'xxxxxxxxxxx',
      userAddress2: '',
      deliveryFee: '',
    });
  }, []);

  useEffect(() => {
    let filtered = [...pizzerias];
    if (key) {
      filtered = filtered.filter(
        (p) =>
          p.address.toLowerCase().includes(key.toLowerCase()) ||
          p.name.toLowerCase().includes(key.toLowerCase()),
      );
    }
    setFilteredPizzeria(filtered);
  }, [key, pizzerias]);

  const handleSearch = (event) => {
    setKey(event.target.value);
  };

  const proceedToCheckout = () => {
    if (!orderInfo.pizzeriaAddress) {
      setError('Select a pizzeria');
      return;
    }
    setError('');
    navigate('/checkout');
  };

  const {handleInputChange, handleSubmit} = useOrderForm(proceedToCheckout);

  return (
    <>
      <div className="orderform-container">
        <h3 style={{fontSize: '20px'}}>PICK UP</h3>
        <form
          onSubmit={handleSubmit}
          id="pickup-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
          }}
        >
          <div
            id="pickup-location-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 0',
            }}
          >
            <h4 style={{marginTop: '0'}}>CHOOSE A PIZZERIA:</h4>
            <label htmlFor="pickup-search-pizzeria" className="orderform-label">
              Search pizzeria:{' '}
            </label>
            <input
              className="text-input"
              type="text"
              name="pizzeriaSearch"
              id="pickup-search-pizzeria"
              onChange={handleSearch}
              placeholder="Search for a pizzeria"
            ></input>
            <div
              style={{
                height: '200px',
                overflow: 'scroll',
                border: '2px solid black',
              }}
            >
              {filteredPizzerias.map((l) => (
                <div
                  key={`pickup-pizzeria-${l.id}`}
                  className={`pizzeria-option ${orderInfo.pizzeriaAddress === l.address ? 'selected-pizzeria' : ''}`}
                  style={{
                    display: 'block',
                    border: '1px solid lightgray',
                    margin: '10px auto',
                    padding: '5px 0',
                    width: 'auto',
                  }}
                >
                  <label
                    htmlFor={'pickup-pizzeria-' + l.name}
                    className="orderform-label"
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      lineHeight: '1.1',
                    }}
                  >
                    <b>{l.name}</b>
                    <br />
                    {l.address}
                  </label>
                  <input
                    type="radio"
                    id={'pickup-pizzeria-' + l.name}
                    value={l.address}
                    name="pizzeriaAddress"
                    onChange={handleInputChange}
                    style={{
                      display: 'none',
                    }}
                  ></input>
                </div>
              ))}
            </div>
          </div>
          <h4>PICK UP TIME*: </h4>
          <div className="order-time-container" id="pickup-time-container">
            <div>
              <label htmlFor="time-option1" className="orderform-label">
                PREORDER
              </label>
              <input
                className="time-option-input"
                type="radio"
                name="timeOption"
                id="time-option1"
                value="preorder"
                onChange={handleInputChange}
                checked={orderInfo.timeOption === 'preorder'}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="time-option2" className="orderform-label">
                NOW
              </label>
              <input
                className="time-option-input"
                type="radio"
                name="timeOption"
                id="time-option2"
                value="now"
                onChange={handleInputChange}
                checked={orderInfo.timeOption === 'now'}
                required
              ></input>
            </div>
          </div>
          {orderInfo.timeOption === 'preorder' && (
            <div className="timedate-container">
              <label htmlFor="day-input" className="orderform-label">
                DATE*:{' '}
              </label>
              <input
                className="timedate-input"
                type="date"
                name="day"
                id="day-input"
                onChange={handleInputChange}
                value={orderInfo.day}
                required
              ></input>
              <label htmlFor="time-input" className="orderform-label">
                TIME*:{' '}
              </label>
              <input
                className="timedate-input"
                type="time"
                name="time"
                id="time-input"
                onChange={handleInputChange}
                value={orderInfo.time}
                required
              ></input>
            </div>
          )}
          <div id="contact-information-container">
            <h4 style={{fontSize: '18px'}}>CONTACT INFORMATION: </h4>
            <label htmlFor="firstname-lastname" className="orderform-label">
              FIRSTNAME & LASTNAME*:{' '}
            </label>
            <input
              className="text-input"
              type="text"
              name="name"
              id="firstname-lastname"
              placeholder="Firstname Lastname"
              onChange={handleInputChange}
              value={orderInfo.name}
              required
            ></input>
            <label htmlFor="phonenumber" className="orderform-label">
              PHONENUMBER*:{' '}
            </label>
            <input
              className="text-input"
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="e.g. 050 000 000 00"
              onChange={handleInputChange}
              value={orderInfo.phonenumber}
              required
            ></input>
            <label htmlFor="email" className="orderform-label">
              EMAIL*:{' '}
            </label>
            <input
              className="text-input"
              type="email"
              size="30"
              name="email"
              id="email"
              placeholder="Email address"
              onChange={handleInputChange}
              value={orderInfo.email}
              required
            ></input>
          </div>
          <div
            id="pickup-details-container"
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <h4>PICK UP DETAILS: </h4>
            <label htmlFor="pickup-details" className="orderform-label">
              DETAILS:{' '}
            </label>
            <textarea
              rows="10"
              cols="40"
              name="details"
              id="pickup-details"
              placeholder="Type details for the pizzeria here"
              style={{margin: 'auto', width: '90%', fontSize: '16px'}}
              onChange={handleInputChange}
              value={orderInfo.details}
            ></textarea>
          </div>
          <button type="submit" className="checkout-btn">
            TO CHECKOUT
          </button>
        </form>
        {error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}
      </div>
    </>
  );
};

export default PickUpForm;
