import {useNavigate} from 'react-router';
import {useOrderContext} from '../hooks/contextHooks';
import {useOrderForm} from '../hooks/orderFormHooks';

import {pizzerias} from '../mock-data/pizzeriaLocations';

const PickUpForm = () => {
  const navigate = useNavigate();
  const {orderInfo} = useOrderContext();

  console.log(orderInfo.pizzeriaAddress);

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const {handleInputChange, handleSubmit} = useOrderForm(proceedToCheckout);

  return (
    <>
      <div style={{border: '1px solid black'}}>
        <h3>PICK UP</h3>
        <form
          action={handleSubmit}
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
            <label htmlFor="pickup-search-pizzeria">Search pizzeria: </label>
            <input
              type="text"
              name="pizzeriaSearch"
              id="pickup-search-pizzeria"
              style={{margin: 'auto'}}
              placeholder="Search for a pizzeria with address"
            ></input>
            <div>
              {pizzerias.map((l) => (
                <div
                  className={`pizzeria-option ${orderInfo.pizzeriaAddress === l.address ? 'selected-pizzeria' : ''}`}
                  style={{
                    display: 'block',
                    border: '1px solid lightgray',
                    margin: '10px auto',
                    width: 'auto',
                  }}
                >
                  <label
                    htmlFor={'pickup-pizzeria-' + l.name}
                    style={{width: '100%'}}
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
          <div
            id="delivery-time-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid black',
            }}
          >
            {' '}
            <h4>Delivery time*: </h4>
            <label htmlFor="time-option1">PREORDER</label>
            <input
              type="radio"
              name="timeOption"
              id="time-option1"
              value="preorder"
              onChange={handleInputChange}
              checked={orderInfo.timeOption === 'preorder'}
              required
            ></input>
            <label htmlFor="time-option2">NOW</label>
            <input
              type="radio"
              name="timeOption"
              id="time-option2"
              value="now"
              onChange={handleInputChange}
              checked={orderInfo.timeOption === 'now'}
              required
            ></input>
            {orderInfo.timeOption === 'preorder' && (
              <div>
                <label htmlFor="day-input">DATE*: </label>
                <input
                  type="date"
                  name="day"
                  id="day-input"
                  onChange={handleInputChange}
                  value={orderInfo.day}
                  required
                ></input>
                <label htmlFor="time-input">TIME*: </label>
                <input
                  type="time"
                  name="time"
                  id="time-input"
                  onChange={handleInputChange}
                  value={orderInfo.time}
                  required
                ></input>
              </div>
            )}
          </div>
          <div
            id="contact-information-container"
            style={{
              backgroundColor: 'gray',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4>Contact information: </h4>
            <label htmlFor="firstname-lastname">FIRSTNAME & LASTNAME*: </label>
            <input
              type="text"
              name="name"
              id="firstname-lastname"
              style={{margin: 'auto'}}
              placeholder="Firstname Lastname"
              onChange={handleInputChange}
              value={orderInfo.name}
              required
            ></input>
            <label htmlFor="phonenumber">PHONENUMBER*: </label>
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              style={{margin: 'auto'}}
              placeholder="e.g. 050 000 000 00"
              onChange={handleInputChange}
              value={orderInfo.phonenumber}
              required
            ></input>
            <label htmlFor="email">EMAIL*: </label>
            <input
              type="email"
              size="30"
              name="email"
              id="email"
              style={{margin: 'auto'}}
              placeholder="Email address"
              onChange={handleInputChange}
              value={orderInfo.email}
              required
            ></input>
          </div>
          <div
            id="delivery-details-container"
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <h4>Delivery details: </h4>
            <label htmlFor="delivery-details">DETAILS: </label>
            <textarea
              rows="10"
              cols="45"
              name="details"
              id="delivery-details"
              placeholder="Type details for the pizzeria here"
              style={{margin: 'auto'}}
              onChange={handleInputChange}
              value={orderInfo.details}
            ></textarea>
          </div>
          <button type="submit">TO CHECKOUT</button>
        </form>
      </div>
    </>
  );
};

export default PickUpForm;
