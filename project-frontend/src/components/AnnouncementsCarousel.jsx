import {useEffect, useState} from 'react';
import Announcement from './Announcement';

const AnnouncementsCarousel = ({announcements}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  return (
    <div className="carousel">
      <button className="carousel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div
        className="carousel-track"
        style={{transform: `translateX(-${current * 100}%)`}}
      >
        {announcements.map((a, i) => (
          <div className="carousel-slide" key={i}>
            <Announcement announcement={a} />
          </div>
        ))}
      </div>
      <button className="carousel-btn next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default AnnouncementsCarousel;
