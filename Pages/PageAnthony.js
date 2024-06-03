import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Header from '../Composants/Header';

const Map = Platform.select({
  web: () => require('../Composants/MapWeb').default,
  default: () => require('../Composants/MapMobile').default,
})();

export default function PageAnthony({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 46.8139,
    longitude: -71.2082,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      );

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    };

    requestLocationPermission();
  }, []);

  const onPlaceSelected = (data, details = null) => {
    if (!details || !details.geometry || !details.geometry.location) {
      console.error('Error: Invalid place details', details);
      return;
    }

    const { lat, lng } = details.geometry.location;
    setRegion({
      ...region,
      latitude: lat,
      longitude: lng,
    });
    setMarkers([...markers, { latitude: lat, longitude: lng, title: data.description }]);
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const onPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkers([...markers, { latitude, longitude }]);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Anthony" />
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={onPlaceSelected}
        query={{
          key: 'AIzaSyCPBT9wpdOQcd_FklvW-MJ1R9LGhuebH-k',
          language: 'en',
        }}
        requestUrl={{
          url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web', // this will tell the component to use the requestUrl on web platform
        }}
        styles={{
          container: {
            flex: 0,
            paddingTop: 10,
            position: 'absolute',
            width: '100%',
            top: 0,
            zIndex: 1,
          },
          listView: { backgroundColor: 'white' },
        }}
        fetchDetails
      />
      <Map
        region={region}
        markers={markers}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
