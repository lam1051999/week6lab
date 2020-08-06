import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/Constants';

export const MapLayoutStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    alignItems: 'center',
    borderRadius: 10,
  },
  calloutImageContainer: {
    marginTop: -10,
  },
  calloutImage: {
    width: 60,
    height: 60,
  },
  calloutDetail: {
    fontSize: 15,
    textAlign: 'center',
  },
});
