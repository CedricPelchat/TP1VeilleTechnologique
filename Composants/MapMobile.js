import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const MapMobile = ({ region, markers, onRegionChangeComplete, onPress }) => {
  const [MapView, setMapView] = useState(null);
  const [Marker, setMarker] = useState(null);

  useEffect(() => {
    // Dynamically import MapView and Marker for mobile platforms
    (async () => {
      const { default: MapViewComponent, Marker: MarkerComponent } = await import('react-native-maps');
      setMapView(() => MapViewComponent);
      setMarker(() => MarkerComponent);
    })();
  }, []);

  if (!MapView || !Marker) {
    return <View style={styles.map} />;
  }

  return (
    <MapView
      style={styles.map}
      region={region}
      showsUserLocation
      onRegionChangeComplete={onRegionChangeComplete}
      onPress={onPress}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapMobile;
