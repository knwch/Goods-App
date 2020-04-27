import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Button} from '@ui-kitten/components';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoia253Y2giLCJhIjoiY2s5Zno2cGg2MGdqazNubzkzaHIzZmppMyJ9.mSjQ3XOe2IKTm1Ub-TwJZw',
);

export default class MapPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followUserLocation: true,
      followZoomLevel: 13,
    };
  }

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  render() {
    const {followUserLocation, followZoomLevel} = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.UserLocation />
            <MapboxGL.Camera
              defaultSettings={{
                centerCoordinate: [100.5018, 13.7563],
                zoomLevel: 13,
              }}
              followUserLocation={followUserLocation}
              followZoomLevel={followZoomLevel}
            />
            <View style={styles.bottom}>
              <Button
                style={styles.button}
                size="medium"
                status="primary"
                onPress={() => navigate('Forms')}>
                ยืนยัน
              </Button>
            </View>
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'relative',
    marginLeft: 36,
    marginRight: 36,
    marginBottom: 36,
    bottom: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
