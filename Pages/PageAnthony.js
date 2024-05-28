import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Header from '../Composants/Header';

export default function PageAnthony({ navigation }) {
	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [markers, setMarkers] = useState([]);

	useEffect(() => {
		let locationSubscription;

		const requestLocationPermission = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission to access location was denied');
				return;
			}

			locationSubscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 1000,  // Update every 1 second
					distanceInterval: 1, // Or every 1 meter
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
		};

		requestLocationPermission();

		// Clean up the subscription on unmount
		return () => {
			if (locationSubscription) {
				locationSubscription.remove();
			}
		};
	}, []);

	const getCurrentLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			console.log('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		const { latitude, longitude } = location.coords;
		setRegion({
			latitude,
			longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
	};

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

			<MapView
				style={styles.map}
				region={region}
				showsUserLocation
				onRegionChangeComplete={region => setRegion(region)}
				onPress={(e) => {
					const { latitude, longitude } = e.nativeEvent.coordinate;
					setMarkers([...markers, { latitude, longitude }]);
				}}
			>
				{markers.map((marker, index) => (
					<TapGestureHandler
						key={index}
						numberOfTaps={2}
						onHandlerStateChange={({ nativeEvent }) => {
							if (nativeEvent.state === State.ACTIVE) {
								const newMarkers = markers.filter((m, i) => i !== index);
								setMarkers(newMarkers);
							}
						}}
					>
						<Marker
							coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
						/>
					</TapGestureHandler>
				))}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});