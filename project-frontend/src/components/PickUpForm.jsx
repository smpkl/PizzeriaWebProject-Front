import {useState} from 'react';

import {pizzerias} from '../mock-data/pizzeriaLocations';

const PickUpForm = () => {
  const [timeOption, setTimeOption] = useState('preorder');

  return (
    <>
      <div style={{border: '1px solid black'}}>
        <h3>PICK UP</h3>
        <form
          action=""
          id="pickup-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
          }}
        >
          <div
            action=""
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
              name="pickup-search-pizzeria"
              id="pickup-search-pizzeria"
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
            id="pick-time-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid black',
            }}
          >
            {' '}
            <h4>Pickup time: </h4>
            <label htmlFor="pickup-time-option1">PREORDER</label>
            <input
              type="radio"
              name="pickup-time-option"
              id="pickup-time-option1"
              value="preorder"
            ></input>
            <label htmlFor="pickup-time-option2">NOW</label>
            <input
              type="radio"
              name="pickup-time-option"
              id="pickup-time-option2"
              value="now"
            ></input>
            {timeOption === 'preorder' && (
              <div>
                <label htmlFor="pickup-day-input">DATE: </label>
                <input
                  type="date"
                  name="pickup-day-input"
                  id="pickup-day-input"
                ></input>
                <label htmlFor="pickup-time-input">TIME: </label>
                <input
                  type="time"
                  name="pickup-time-input"
                  id="pickup-time-input"
                ></input>
              </div>
            )}
          </div>
          <div
            id="pickup-contact-information-container"
            style={{
              backgroundColor: 'gray',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4>Contact information: </h4>
            <label htmlFor="pickup-firstname-lastname">
              FIRSTNAME & LASTNAME:{' '}
            </label>
            <input
              type="text"
              name="pickup-firstname-lastname"
              id="pickup-firstname-lastname"
              style={{margin: 'auto'}}
              placeholder="Firstname Lastname"
            ></input>
            <label htmlFor="pickup-phonenumber">PHONENUMBER: </label>
            <input
              type="text"
              name="pickup-phonenumber"
              id="pickup-phonenumber"
              style={{margin: 'auto'}}
              placeholder="e.g. 050 000 000 00"
            ></input>
            <label htmlFor="pickup-email">EMAIL: </label>
            <input
              type="text"
              name="pickup-email"
              id="pickup-email"
              style={{margin: 'auto'}}
              placeholder="Email address"
            ></input>
          </div>
          <div
            id="pickup-details-container"
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <h4>Pick up details: </h4>
            <label htmlFor="pickup-details">DETAILS: </label>
            <textarea
              rows="10"
              cols="45"
              name="pickup-details"
              id="pickup-details"
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

export default PickUpForm;
