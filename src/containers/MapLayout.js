import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import ImagePicker from 'react-native-image-picker';
import {MapLayoutStyles as styles} from '../styles/Styles';

export default function App() {
  const [locations, setLocations] = useState([]);
  function handleLongClickMap(evt) {
    let coordinate = evt.nativeEvent.coordinate;

    let source = '';
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        source = {uri: 'data:image/jpeg;base64,' + response.data};
        setLocations((prevState) => [
          ...prevState,
          {
            ...coordinate,
            source: source,
            description: `Marker ${prevState.length + 1}`,
          },
        ]);
      }
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onLongPress={handleLongClickMap}>
        {!locations.length
          ? null
          : locations.map((item, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}>
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.calloutImageContainer}>
                      {item.source ? (
                        <Image
                          source={item.source}
                          style={styles.calloutImage}
                          resizeMode="cover"
                        />
                      ) : null}
                    </Text>
                    <Text style={styles.calloutDetail}>{item.description}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
      </MapView>
    </View>
  );
}
