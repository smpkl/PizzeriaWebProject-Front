import {useOrderForm} from '../hooks/orderFormHooks';
//import {useOrderContext} from '../hooks/contextHooks';
import {useNavigate} from 'react-router';

const DeliveryForm = () => {
  const navigate = useNavigate();

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const {handleInputChange, handleSubmit, orderInputs} =
    useOrderForm(proceedToCheckout);

  return (
    <>
      <div style={{border: '1px solid black'}}>
        <h3>DELIVERY</h3>
        <form
          action=""
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
            <label htmlFor="userAddress">Adress: </label>
            <input
              type="text"
              name="userAddress"
              id="userAddress"
              style={{margin: 'auto'}}
              placeholder="Street name and number, postal code, city"
              onChange={handleInputChange}
              value={orderInputs.userAddress}
            ></input>
            <label htmlFor="userAddress2">Building/apartment: </label>
            <input
              type="text"
              name="userAddress2"
              id="userAddress2"
              style={{margin: 'auto'}}
              placeholder="e.g. Apartment B 2"
              onChange={handleInputChange}
              value={orderInputs.userAddress2}
            ></input>
          </div>
          {/*En tiedä mistä/miten nää pizzeria vaihtoehdot täytyy hakea. Onko vielä osa suunnitelmaa vai onko meillä vaan yksi lokaatio?*/}
          <div
            id="pizzeria-choice-container"
            style={{backgroundColor: 'lightgray'}}
          >
            <h4>Choose a pizzeria: </h4>
            <div>
              <label htmlFor="pizzeriaChoice1" id="pizzeriaChoice1">
                Pizzeria 1, Osoite 1
              </label>
              <input
                type="radio"
                name="pizzeriaAddress"
                value="pizzeria-1"
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              <label htmlFor="pizzeriaChoice2" id="pizzeriaChoice2">
                Pizzeria 2, Osoite 2
              </label>
              <input
                type="radio"
                name="pizzeriaAddress"
                value="pizzeria-2"
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              <label htmlFor="pizzeriaChoice2" id="pizzeriaChoice2">
                Pizzeria 3, Osoite 3
              </label>
              <input
                type="radio"
                name="pizzeriaAddress"
                value="pizzeria-3"
                onChange={handleInputChange}
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
            <h4>Delivery time: </h4>
            <label htmlFor="time-option1">PREORDER</label>
            <input
              type="radio"
              name="timeOption"
              id="time-option1"
              value="preorder"
              onChange={handleInputChange}
            ></input>
            <label htmlFor="time-option2">NOW</label>
            <input
              type="radio"
              name="timeOption"
              id="time-option2"
              value="now"
              onChange={handleInputChange}
            ></input>
            {orderInputs.timeOption === 'preorder' && (
              <div>
                <label htmlFor="day-input">DATE: </label>
                <input
                  type="date"
                  name="day"
                  id="day-input"
                  onChange={handleInputChange}
                  value={orderInputs.day}
                ></input>
                <label htmlFor="time-input">TIME: </label>
                <input
                  type="time"
                  name="time"
                  id="time-input"
                  onChange={handleInputChange}
                  value={orderInputs.time}
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
            <label htmlFor="firstname-lastname">FIRSTNAME & LASTNAME: </label>
            <input
              type="text"
              name="name"
              id="firstname-lastname"
              style={{margin: 'auto'}}
              placeholder="Firstname Lastname"
              onChange={handleInputChange}
              value={orderInputs.name}
            ></input>
            <label htmlFor="phonenumber">PHONENUMBER: </label>
            <input
              type="text"
              name="phonenumber"
              id="phonenumber"
              style={{margin: 'auto'}}
              placeholder="e.g. 050 000 000 00"
              onChange={handleInputChange}
              value={orderInputs.phonenumber}
            ></input>
            <label htmlFor="email">EMAIL: </label>
            <input
              type="text"
              name="email"
              id="email"
              style={{margin: 'auto'}}
              placeholder="Email address"
              onChange={handleInputChange}
              value={orderInputs.email}
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
              value={orderInputs.details}
            ></textarea>
          </div>
        </form>
        <button onClick={handleSubmit}>TO CHECKOUT</button>
      </div>
    </>
  );
};

export default DeliveryForm;
