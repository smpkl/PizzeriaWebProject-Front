import {useOrderForm} from '../hooks/orderFormHooks';
import {useOrderContext} from '../hooks/contextHooks';
import {useNavigate} from 'react-router';
import {useState} from 'react';

const DeliveryForm = () => {
  const navigate = useNavigate();
  const {orderInfo} = useOrderContext();
  console.log(orderInfo.day, orderInfo.time);

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const {handleInputChange, handleSubmit} = useOrderForm(proceedToCheckout);

  return (
    <>
      <div style={{border: '1px solid black'}}>
        <h3>DELIVERY</h3>
        <form
          action={handleSubmit}
          id="delivery-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
          }}
        >
          <div
            id="user-address-container"
            style={{
              backgroundColor: 'lightgray',
              border: '1px solid black',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label htmlFor="userAddress">ADRESS*: </label>
            <input
              type="text"
              name="userAddress"
              id="userAddress"
              style={{margin: 'auto'}}
              placeholder="Street name and number, postal code, city"
              onChange={handleInputChange}
              value={orderInfo.userAddress}
              required
            ></input>
            <label htmlFor="userAddress2">
              BUILDING/APARTMENT (type - to leave empty)*:{' '}
            </label>
            <input
              type="text"
              name="userAddress2"
              id="userAddress2"
              style={{margin: 'auto'}}
              placeholder="e.g. Apartment B 2"
              onChange={handleInputChange}
              value={orderInfo.userAddress2}
              required
            ></input>
          </div>
          {/*En tiedä mistä/miten nää pizzeria vaihtoehdot täytyy hakea. Onko vielä osa suunnitelmaa vai onko meillä vaan yksi lokaatio?*/}
          <div
            id="pizzeria-choice-container"
            style={{backgroundColor: 'lightgray'}}
          >
            <h4>Choose a pizzeria*: </h4>
            <div>
              <label htmlFor="pizzeriaChoice1">Pizzeria 1, Osoite 1</label>
              <input
                id="pizzeriaChoice1"
                type="radio"
                name="pizzeriaAddress"
                value="pizzeria-1"
                onChange={handleInputChange}
                checked={orderInfo.pizzeriaAddress === 'pizzeria-1'}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="pizzeriaChoice2">Pizzeria 2, Osoite 2</label>
              <input
                id="pizzeriaChoice2"
                type="radio"
                name="pizzeriaAddress"
                value="pizzeria-2"
                onChange={handleInputChange}
                checked={orderInfo.pizzeriaAddress === 'pizzeria-2'}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="pizzeriaChoice3">Pizzeria 3, Osoite 3</label>
              <input
                id="pizzeriaChoice3"
                type="radio"
                name="pizzeriaAddress"
                value="pizzeria-3"
                onChange={handleInputChange}
                checked={orderInfo.pizzeriaAddress === 'pizzeria-3'}
                required
              ></input>
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

export default DeliveryForm;
