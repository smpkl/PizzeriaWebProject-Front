import {useOrderForm} from '../hooks/orderFormHooks';
import {useOrderContext} from '../hooks/contextHooks';
import {useNavigate} from 'react-router';
import {useEffect, useState} from 'react';
import {usePizzerias} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const DeliveryForm = () => {
  const [userLocation, setUserLocation] = useState({});
  const [sortedPizzerias, setSortedPizzerias] = useState();
  const [topThreePizzerias, setTopThreePizzerias] = useState();
  const {user} = useUserContext();
  const {pizzerias} = usePizzerias();
  const navigate = useNavigate();
  const {orderInfo, handleDeliveryFee, handleOrderInfoChange} =
    useOrderContext();

  const reactToPizzeriaSelect = (event, fee) => {
    handleInputChange(event);
    handleDeliveryFee(fee);
  };

  // Error for cases when location cannot be found:
  function error(err) {
    console.log('ERROR ' + err.code + ': ' + err.message);
  }

  // If users position is found:
  function success(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    setUserLocation({lat: latitude, long: longitude});
  }

  useEffect(() => {
    if (user) {
      handleOrderInfoChange({
        userAddress: user.address || '',
        userAddress2: '',
        name: `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim(),
        phonenumber: user.phonenumber || '',
        email: user.email || '',
      });
    } else {
      handleOrderInfoChange({
        userAddress: '',
        userAddress2: '',
        name: '',
        phonenumber: '',
        email: '',
      });
    }
  }, [user]);

  // Try to add distances to pizzerias and sort them if userLocation is found:
  useEffect(() => {
    const sorted = [...pizzerias];

    function addDistances() {
      sorted.map((p) => {
        const distance =
          Math.sqrt(
            (userLocation.lat - p.latitude) ** 2 +
              (userLocation.long - p.longitude) ** 2,
          ) * 100;

        // Tätä voi jossain vaiheessa työstää pidemmälle. Olisi varmaan järkevämpi selvittää käyttäjän syöttämän osoitteen koordinaatit, ettei käyttäjä pysty huijaamaan halvempaa kuljetusta (= geolocation koordinaatit ei vastaa osoitteen koordinaatteja). Tähän tarvis varmaan jokin ulkoisen APIn. En nyt jaksa tutkia asiaa. -Riikka

        /*if (distance < 2) {
          p.fee = 4.59;
        } else if (distance > 10) {
          p.fee = 9.99;
        } else {
          p.fee = 6.75;
        } */

        // Let's use default delivery fee for now
        p.fee = 6.95;
        p.distance = distance;
      });
    }

    function sortPizzerias() {
      sorted.sort((a, b) => a.distance - b.distance);
    }

    function collectTopThree() {
      let count = 0;
      let topThree = [];
      sorted.forEach((p) => {
        if (count < 3) {
          topThree.push(p);
          count++;
        }
      });
      setTopThreePizzerias(topThree);
    }

    if (pizzerias && userLocation) {
      addDistances();
      sortPizzerias();
      collectTopThree();
      setSortedPizzerias(sorted);
    }
  }, [userLocation, pizzerias]);

  // Find user location:
  useEffect(() => {
    function findLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log('Not supported');
      }
    }
    findLocation();
  }, []);

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const {handleInputChange, handleSubmit} = useOrderForm(proceedToCheckout);

  return (
    <>
      <div className="orderform-container">
        <h3 style={{fontSize: '22px'}}>DELIVERY</h3>
        <form
          className="orderform"
          onSubmit={handleSubmit}
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
              backgroundColor: '#ecb640ff',
              border: '1px solid #ecb640ff',
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
            }}
          >
            <label htmlFor="userAddress" className="orderform-label">
              ADRESS*:
            </label>
            <input
              className="text-input"
              type="text"
              name="userAddress"
              id="userAddress"
              placeholder="Street name and number, postal code, city"
              onChange={handleInputChange}
              value={orderInfo.userAddress}
              required
            ></input>
            <label htmlFor="userAddress2" className="orderform-label">
              BUILDING/APARTMENT (type - to leave empty)*:{' '}
            </label>
            <input
              className="text-input"
              type="text"
              name="userAddress2"
              id="userAddress2"
              placeholder="e.g. Apartment B 2"
              onChange={handleInputChange}
              value={orderInfo.userAddress2}
              required
            ></input>
          </div>
          <div id="pizzeria-choice-container" style={{border: '1px solid '}}>
            <div
              style={{
                color: '#F5EEE6',
                backgroundColor: '#710009',
                marginBottom: '0',
                padding: '10px 0',
              }}
            >
              <h4>CHOOSE A PIZZERIA*: </h4>
              <p>
                To find closest pizzeria, and cheapest delivery price,
                <br />
                please turn on location finder.
              </p>
            </div>
            {
              //If pizzerias could be sorted (aka userLocation was found), display three closest pizzerias:
              sortedPizzerias && (
                <div>
                  {topThreePizzerias.map((p) => (
                    <div
                      key={`delivery-pizzeria-${p.id}`}
                      className={`pizzeria-option ${orderInfo.pizzeriaAddress === `${p.name} - ${p.address}` ? 'selected-pizzeria' : ''}`}
                      style={{
                        display: 'block',
                        border: '1px solid lightgray',
                        margin: '10px auto',
                        width: 'auto',
                      }}
                    >
                      <label
                        htmlFor={'delivery-pizzeria-' + p.name}
                        className="orderform-label"
                      >
                        <b>{p.name}</b>
                        <br />
                        {p.address}
                        <br />
                        {p.distance.toFixed(0)} km
                        <br />
                        Delivery fee: {p.fee}€
                      </label>
                      <input
                        type="radio"
                        id={'delivery-pizzeria-' + p.name}
                        value={`${p.name} - ${p.address}`}
                        name="pizzeriaAddress"
                        onChange={(event) =>
                          reactToPizzeriaSelect(event, p.fee)
                        }
                        style={{
                          display: 'none',
                        }}
                      ></input>
                    </div>
                  ))}
                </div>
              )
            }
            {
              // If no userLocation was found and pizzerias could not be sorted, display them all:
              !sortedPizzerias && (
                <div>
                  {pizzerias.map((p) => (
                    <div
                      key={`delivery-pizzeria-${p.id}`}
                      className={`pizzeria-option ${orderInfo.pizzeriaAddress === `${p.name} - ${p.address}` ? 'selected-pizzeria' : ''}`}
                      style={{
                        display: 'block',
                        border: '1px solid lightgray',
                        margin: '10px auto',
                        width: 'auto',
                      }}
                    >
                      <label
                        htmlFor={'delivery-pizzeria-' + p.name}
                        className="orderform-label"
                      >
                        <b>{p.name}</b>
                        <br />
                        {p.address}
                      </label>
                      <input
                        type="radio"
                        id={'delivery-pizzeria-' + p.name}
                        value={`${p.name} - ${p.address}`}
                        name="pizzeriaAddress"
                        onChange={handleInputChange}
                        style={{
                          display: 'none',
                        }}
                      ></input>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
          <h4>DELIVERY TIME*: </h4>
          <div className="order-time-container" id="delivery-time-container">
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
            id="delivery-details-container"
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <h4>DELIVERY DETAILS: </h4>
            <label htmlFor="delivery-details" className="orderform-label">
              DETAILS:{' '}
            </label>
            <textarea
              rows="10"
              cols="40"
              name="details"
              id="delivery-details"
              placeholder="Type details for the pizzeria here"
              onChange={handleInputChange}
              value={orderInfo.details}
              style={{width: '90%', margin: 'auto', fontSize: '16px'}}
            ></textarea>
          </div>
          <button type="submit" className="checkout-btn">
            TO CHECKOUT
          </button>
        </form>
      </div>
    </>
  );
};

export default DeliveryForm;
