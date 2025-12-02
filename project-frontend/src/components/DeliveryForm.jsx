import {useState} from 'react';

const DeliveryForm = () => {
  const [timeOption, setTimeOption] = useState('preorder');

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
            <label htmlFor="user-address">Adress: </label>
            <input
              type="text"
              name="user-address"
              id="user-address"
              style={{margin: 'auto'}}
              placeholder="Street name and number, postal code, city"
            ></input>
            <label htmlFor="user-address2">Building/apartment: </label>
            <input
              type="text"
              name="user-address2"
              id="user-address2"
              style={{margin: 'auto'}}
              placeholder="e.g. Apartment B 2"
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
                name="pizzeria-choice"
                value="pizzeria-1"
              ></input>
            </div>
            <div>
              <label htmlFor="pizzeriaChoice2" id="pizzeriaChoice2">
                Pizzeria 2, Osoite 2
              </label>
              <input
                type="radio"
                name="pizzeria-choice"
                value="pizzeria-2"
              ></input>
            </div>
            <div>
              <label htmlFor="pizzeriaChoice2" id="pizzeriaChoice2">
                Pizzeria 3, Osoite 3
              </label>
              <input
                type="radio"
                name="pizzeria-choice"
                value="pizzeria-3"
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
            <label htmlFor="delivery-time-option1">PREORDER</label>
            <input
              type="radio"
              name="delivery-time-option"
              id="delivery-time-option1"
              value="preorder"
            ></input>
            <label htmlFor="delivery-time-option2">NOW</label>
            <input
              type="radio"
              name="delivery-time-option"
              id="delivery-time-option2"
              value="now"
            ></input>
            {timeOption === 'preorder' && (
              <div>
                <label htmlFor="day-input">DATE: </label>
                <input type="date" name="day-input" id="day-input"></input>
                <label htmlFor="time-input">TIME: </label>
                <input type="time" name="time-input" id="time-input"></input>
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
              name="firstname-lastname"
              id="firstname-lastname"
              style={{margin: 'auto'}}
              placeholder="Firstname Lastname"
            ></input>
            <label htmlFor="phonenumber">PHONENUMBER: </label>
            <input
              type="text"
              name="phonenumber"
              id="phonenumber"
              style={{margin: 'auto'}}
              placeholder="e.g. 050 000 000 00"
            ></input>
            <label htmlFor="email">EMAIL: </label>
            <input
              type="text"
              name="email"
              id="email"
              style={{margin: 'auto'}}
              placeholder="Email address"
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
              name="delivery-details"
              id="delivery-details"
              placeholder="Type details for the pizzeria here"
              style={{margin: 'auto'}}
            ></textarea>
          </div>
        </form>
        <button>TO CHECKOUT</button>
      </div>
    </>
  );
};

export default DeliveryForm;
