import {useState} from 'react';

import {pizzerias} from '../mock-data/pizzeriaLocations';

const AtPizzeriaForm = () => {
  const [timeOption, setTimeOption] = useState('preorder');

  return (
    <>
      <div style={{border: '1px solid black'}}>
        <h3>AT PIZZERIA</h3>
        <form
          action=""
          id="atPizzeria-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
          }}
        >
          <div
            action=""
            id="atPizzeria-location-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 0',
            }}
          >
            <label htmlFor="atPizzeria-search-pizzeria">
              Search pizzeria:{' '}
            </label>
            <input
              type="text"
              name="atPizzeria-search-pizzeria"
              id="atPizzeria-search-pizzeria"
              style={{margin: 'auto'}}
              placeholder="Search for a pizzeria with address"
            ></input>
            <div>
              {pizzerias.map((l) => (
                <p>
                  {l.name} - {l.address}
                </p>
              ))}
            </div>
          </div>
          <div
            id="atPizzeria-time-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid black',
            }}
          >
            {' '}
            <h4>Arrival time: </h4>
            <label htmlFor="atPizzeria-time-option1">PREORDER</label>
            <input
              type="radio"
              name="atPizzeria-time-option"
              id="atPizzeria-time-option1"
              value="preorder"
            ></input>
            <label htmlFor="atPizzeria-time-option2">NOW</label>
            <input
              type="radio"
              name="atPizzeria-time-option"
              id="atPizzeria-time-option2"
              value="now"
            ></input>
            {timeOption === 'preorder' && (
              <div>
                <label htmlFor="atPizzeria-day-input">DATE: </label>
                <input
                  type="date"
                  name="atPizzeria-day-input"
                  id="atPizzeria-day-input"
                ></input>
                <label htmlFor="atPizzeria-time-input">TIME: </label>
                <input
                  type="time"
                  name="atPizzeria-time-input"
                  id="atPizzeria-time-input"
                ></input>
              </div>
            )}
          </div>
          <div
            id="atPizzeria-contact-information-container"
            style={{
              backgroundColor: 'gray',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4>Contact information: </h4>
            <label htmlFor="atPizzeria-firstname-lastname">
              FIRSTNAME & LASTNAME:{' '}
            </label>
            <input
              type="text"
              name="atPizzeria-firstname-lastname"
              id="atPizzeria-firstname-lastname"
              style={{margin: 'auto'}}
              placeholder="Firstname Lastname"
            ></input>
            <label htmlFor="atPizzeria-phonenumber">PHONENUMBER: </label>
            <input
              type="text"
              name="atPizzeria-phonenumber"
              id="atPizzeria-phonenumber"
              style={{margin: 'auto'}}
              placeholder="e.g. 050 000 000 00"
            ></input>
            <label htmlFor="atPizzeria-email">EMAIL: </label>
            <input
              type="text"
              name="atPizzeria-email"
              id="atPizzeria-email"
              style={{margin: 'auto'}}
              placeholder="Email address"
            ></input>
          </div>
          <div
            id="atPizzeria-details-container"
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <h4>Order details: </h4>
            <label htmlFor="atPizzeria-details">DETAILS: </label>
            <textarea
              rows="10"
              cols="45"
              name="atPizzeria-details"
              id="atPizzeria-details"
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

export default AtPizzeriaForm;
