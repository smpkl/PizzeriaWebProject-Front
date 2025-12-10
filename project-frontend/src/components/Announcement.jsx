const Announcement = ({announcement}) => {
  return (
    <div
      className="announcement-container"
      style={{
        backgroundColor: '#0c2720ff',
        padding: '10px 0 30px 0',
        color: '#F5EEE6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        minHeight: '500px',
      }}
    >
      <div className="announcement-inner">
        <h2>{announcement.title}</h2>
        <p>{announcement.text}</p>
        <div className="announcement-img-container">
          <img
            className="announcement-img"
            src={
              announcement?.filename
                ? `${import.meta.env.VITE_API_BASE_URL}uploads/${announcement.filename}`
                : 'https://placehold.co/300x150/green/white?text=ANNOUNCEMENT+IMG'
            }
            alt="Announcement picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Announcement;
