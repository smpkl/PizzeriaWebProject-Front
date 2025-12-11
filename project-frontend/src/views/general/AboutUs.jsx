import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import {usePizzerias} from '../../hooks/apiHooks';
import L from 'leaflet';
import MapController from '../../components/MapController';
import {useRef, useState} from 'react';

const AboutUs = () => {
  const [mapLocation, setMapLocation] = useState({});
  const [selectedPizzeriaId, setSelectedPizzeriaId] = useState(null);
  const markerRefs = useRef({});
  const {pizzerias} = usePizzerias();

  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState({type: null, message: null});

  const locationIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <div id="aboutUs-container">
        <h1 style={{width: '90%', margin: 'auto'}}>ABOUT US</h1>
        <div style={{width: '90%', margin: 'auto'}}>
          <p>
            At Pizzeria TBA, we’re here to redefine fast pizza without cutting
            corners. Our mission is simple: bold flavors, high-quality
            ingredients, and fresh-made dough — served fast, without the
            fast-food compromise.
          </p>
          <div id="aboutUs-img-container">
            <img
              src={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/2560px-Pizza-3007395.jpg'
              }
              alt="Pizzeria TBA, About us page image of a pizza"
              style={{width: '100%'}}
            />
          </div>
          <p>
            Every pizza starts with our signature light and crispy crust,
            house-made sauces, and toppings sourced from local producers
            whenever possible. From classics to fully loaded creations, we’ve
            got something for everyone — including vegan, vegetarian, and
            gluten-friendly options so every guest can enjoy their perfect
            slice.
          </p>
          <p>
            Our space blends a modern street-food vibe with a relaxed hangout
            atmosphere. Order at the counter, watch your pizza fire up in our
            open oven, and grab a seat — or take it to go. Prefer to stay home?
            No problem — we offer fast and reliable delivery straight to your
            door.
          </p>
          <p>
            At Pizzeria TBA, we keep it fresh, we keep it fast, and we keep it
            real. Your new favorite slice starts here.
          </p>
        </div>
        <div id="aboutUs-our-pizzerias">
          <h2 style={{width: '90%', margin: '10px auto'}}>OUR PIZZERIAS</h2>
          <div id="aboutUs-map-container">
            <MapContainer
              center={[60.197979, 24.927743]}
              zoom={14}
              scrollWheelZoom={true}
              style={{height: '100%', width: '100%', zIndex: '1'}}
            >
              <TileLayer
                attribution='<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {pizzerias.map((p) => {
                return (
                  <Marker
                    icon={locationIcon}
                    key={`pizzeria-${p.id}-marker`}
                    position={[p.latitude, p.longitude]}
                    ref={(element) => {
                      if (element) markerRefs.current[p.id] = element;
                    }}
                  >
                    <Popup>
                      <b>{p.name}</b> <br /> {p.address}
                    </Popup>
                  </Marker>
                );
              })}
              {mapLocation && (
                <MapController
                  lat={mapLocation.lat}
                  long={mapLocation.long}
                  markers={markerRefs}
                  selectedId={selectedPizzeriaId}
                />
              )}
            </MapContainer>
          </div>
          <div>
            {pizzerias.map((p) => (
              <p
                key={`pizzeria-${p.id}`}
                id={`pizzeria-${p.id}`}
                onClick={() => {
                  setMapLocation({lat: p.latitude, long: p.longitude});
                  setSelectedPizzeriaId(p.id);
                }}
                style={{fontWeight: 'bold'}}
              >
                {p.name}
              </p>
            ))}
          </div>
        </div>
        <div id="aboutUs-feedback-container">
          <div
            className="feedback-block"
            aria-labelledby="anna-palautetta-heading"
          >
            <h2 id="feedback-heading" className="feedback-title">
              GIVE US FEEDBACK{' '}
            </h2>

            <form
              className="feedback-form"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus({
                  type: 'success',
                  message: 'Thank you for the feedback!',
                });
                setFeedback('');
              }}
            >
              <label htmlFor="feedback-text" className="orderform-label">
                Type your feedback here:
              </label>
              <textarea
                id="feedback-text"
                className="feedback-textarea"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={'Your feedback'}
                rows={6}
                style={{margin: '10px 0', height: '300px'}}
              />
              <input
                id="feedback-email"
                type="email"
                className="edit-dialog-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type email"
              />
              <button type="submit" className="dark-btn">
                SEND
              </button>
              {status.message && (
                <p
                  className={`feedback-status ${status.type}`}
                  role={status.type === 'error' ? 'alert' : 'status'}
                  style={{margin: '0 auto 10px auto', color: '#0c2720ff'}}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
