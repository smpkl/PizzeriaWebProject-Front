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
  
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState({ type: null, message: null });

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
              src={`${import.meta.env.VITE_PUBLIC_URL}pizzeria_about_us_img.jpg`}
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
        <div
          style={{
            backgroundColor: '#ecb640ff',
            height: '10vh',
            margin: '10px 0',
            padding: '10px 0',
          }}
        >
          FEEDBACK KOMPONENTTI TÄHÄN
          
{/* --- PALAUTELOHKO --- */}
<section className="feedback-block" aria-labelledby="anna-palautetta-heading">
  <h2 id="anna-palautetta-heading" className="feedback-title">
    ANNA PALAUTETTA
  </h2>

  <form
    className="feedback-form"
    onSubmit={(e) => {
      e.preventDefault();
      setStatus({ type: "success", message: "Kiitos palautteesta!" });
      setFeedback("");
    }}
  >
    {/* Tekstialueen otsikko */}
    <label htmlFor="feedback-text" className="feedback-label">
      KIRJOITA PALAUTE TÄHÄN.
    </label>

    {/* Iso tekstialue katkoviivoilla */}
    <textarea
      id="feedback-text"
      className="feedback-textarea"
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
      placeholder={
        `------------------------------------\n` +
        `------------------------------------\n` +
        `------------------------------------`
      }
      rows={6}
    />

    {/* Sähköposti */}
    <input
      id="feedback-email"
      type="email"
      className="feedback-email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="sähköposti.tähän"
    />

    {/* Soikea lähetysnappi */}
    <button type="submit" className="feedback-submit">
      LÄHETÄ
    </button>

    {/* Tila/virheviesti */}
    {status.message && (
      <p
        className={`feedback-status ${status.type}`}
        role={status.type === "error" ? "alert" : "status"}
      >
        {status.message}
      </p>
    )}
  </form>

  {/* Tähän sisäänrakennettu tyyli */}
  <style jsx>{`
    .feedback-block {
      margin-top: 2rem;
      display: grid;
      place-items: center;
    }

    .feedback-title {
      font-size: 1.75rem; /* iso otsikko */
      font-weight: 700;
      letter-spacing: 0.02em;
      margin-bottom: 1rem;
      text-transform: uppercase;
      text-align: center;
    }

    .feedback-form {
      width: 100%;
      max-width: 520px;        /* kuvan mittakaavaan */
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .feedback-label {
      font-weight: 700;
      margin-left: 0.35rem;
    }

    .feedback-textarea {
      width: 100%;
      border: 2px solid #000;  /* musta kehys kuten mallissa */
      border-radius: 4px;
      padding: 0.75rem;
      font-size: 1rem;
      line-height: 1.4;
      resize: vertical;
      background:
        /* ohut vaalea tausta */
        #fff;
    }

    .feedback-email {
      width: 100%;
      border: 2px solid #000;
      border-radius: 2px;
      padding: 0.5rem 0.75rem;
      font-size: 1rem;
    }

    .feedback-submit {
      align-self: center;
      background: transparent;
      border: 2px solid #000;  /* musta soikea kehys */
      border-radius: 999px;    /* soikea */
      padding: 0.5rem 2.25rem; /* mittakaava */
      font-weight: 700;
      letter-spacing: 0.03em;
      cursor: pointer;
      transition: transform 0.06s ease;
    }

    .feedback-submit:hover {
      transform: scale(1.02);
    }

    .feedback-status {
      margin-top: 0.5rem;
      text-align: center;
      font-weight: 600;
    }
    .feedback-status.success { color: #0a7d3b; }
    .feedback-status.error   { color: #b00020; }
  `}</style>
</section>
{/* --- /PALAUTELOHKO --- */}

        </div>
      </div>
    </>
  );
};

export default AboutUs;
