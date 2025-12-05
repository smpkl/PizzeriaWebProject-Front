import {useMap} from 'react-leaflet';

const MapController = ({lat, long, markers, selectedId}) => {
  const map = useMap();

  if (lat && long && selectedId !== null) {
    map.flyTo([lat, long]);

    map.once('moveend', () => {
      const marker = markers.current[selectedId];
      if (marker) {
        marker.openPopup();
      }
    });
  }
};

export default MapController;
