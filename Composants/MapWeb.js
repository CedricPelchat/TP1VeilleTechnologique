import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapWeb = ({ region, markers, onRegionChangeComplete, onPress }) => {
  const map = useMapEvent('moveend', () => {
    const { lat, lng } = map.getCenter();
    onRegionChangeComplete({ latitude: lat, longitude: lng });
  });

  useMapEvent('click', (e) => {
    onPress({ nativeEvent: { coordinate: e.latlng } });
  });

  return (
    <MapContainer
      center={[region.latitude, region.longitude]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.latitude, marker.longitude]}
        />
      ))}
    </MapContainer>
  );
};

export default MapWeb;
