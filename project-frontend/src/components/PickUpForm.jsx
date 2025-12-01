import {useState} from 'react';

import {pizzerias} from '../mock-data/pizzeriaLocations';

const PickUpForm = () => {
  const [timeOption, setTimeOption] = useState('preorder');

  return (
    <>
      <div style={{border: '1px solid black'}}>
        <h3>PICK UP</h3>
        <div
          action=""
          id="pizzeria-location-selection"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
          }}
        >
          <label htmlFor="search-pizzeria">Search pizzeria: </label>
          <input
            type="text"
            name="search-pizzeria"
            id="search-pizzeria"
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
        <form
          action=""
          id="pickup-time-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'lightyellow',
            padding: '20px 0',
          }}
        >
          <h4>Pick up time: </h4>
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
              <label htmlFor="day-input">DATE: </label>
              <input type="date" name="day-input" id="day-input"></input>
              <label htmlFor="time-input">TIME: </label>
              <input type="time" name="time-input" id="time-input"></input>
            </div>
          )}
        </form>
        <form
          action=""
          id="pickup-user-info-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
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
        </form>
        <form
          action=""
          id="pickup-details-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'lightgrey',
            padding: '20px 0',
          }}
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
        </form>
        <button>TO CHECKOUT</button>
      </div>
    </>
  );
};

export default PickUpForm;
