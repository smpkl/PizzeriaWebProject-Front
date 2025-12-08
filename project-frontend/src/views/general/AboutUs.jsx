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
      <h1 style={{width: '90%'}}>ABOUT US</h1>
      <div style={{width: '90%'}}>
        <p>
          At Pizzeria TBA, we’re here to redefine fast pizza without cutting
          corners. Our mission is simple: bold flavors, high-quality
          ingredients, and fresh-made dough — served fast, without the fast-food
          compromise.
        </p>
        <div>
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}pizzeria_about_us_img.jpg`}
            alt="Pizzeria TBA, About us page image of a pizza"
            style={{width: '100%'}}
          />
        </div>
        <p>
          Every pizza starts with our signature light and crispy crust,
          house-made sauces, and toppings sourced from local producers whenever
          possible. From classics to fully loaded creations, we’ve got something
          for everyone — including vegan, vegetarian, and gluten-friendly
          options so every guest can enjoy their perfect slice.
        </p>
        <p>
          Our space blends a modern street-food vibe with a relaxed hangout
          atmosphere. Order at the counter, watch your pizza fire up in our open
          oven, and grab a seat — or take it to go. Prefer to stay home? No
          problem — we offer fast and reliable delivery straight to your door.
        </p>
        <p>
          At Pizzeria TBA, we keep it fresh, we keep it fast, and we keep it
          real. Your new favorite slice starts here.
        </p>
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'salmon',
          margin: 'auto',
          padding: '20px 0',
        }}
      >
        <h2 style={{width: '90%', margin: '10px auto'}}>OUR PIZZERIAS</h2>
        <div
          style={{
            height: '400px',
            width: '95%',
            margin: 'auto',
            border: '5px outset lightsalmon',
          }}
        >
          <MapContainer
            center={[60.197979, 24.927743]}
            zoom={14}
            scrollWheelZoom={true}
            style={{height: '100%', width: '100%'}}
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
              style={{color: 'white', fontWeight: 'bold'}}
            >
              {p.name}
            </p>
          ))}
        </div>
      </div>
      <div>FEEDBACK KOMPONENTTI TÄhÄN</div>
    </>
  );
};

export default AboutUs;
