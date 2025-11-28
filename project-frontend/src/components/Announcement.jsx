// Pizzerian info sivu (esittely, kartta, lomake, yhteystiedot)
const Announcement = ({announcement}) => {
  return (
    <>
      <div
        className="announcement-container"
        style={{backgroundColor: 'lightgreen', padding: '10px'}}
      >
        <h2>{announcement.title}</h2>
        <p>{announcement.text}</p>
        <img
          src={
            announcement.filename ??
            'https://placehold.co/300x150/green/white?text=ANNOUNCEMENT+IMG'
          }
          alt="Announcement picture"
        ></img>
      </div>
    </>
  );
};

export default Announcement;
