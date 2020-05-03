import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Button, Text} from '@ui-kitten/components';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoia253Y2giLCJhIjoiY2s5Zno2cGg2MGdqazNubzkzaHIzZmppMyJ9.mSjQ3XOe2IKTm1Ub-TwJZw',
);

export default class MapPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followUserLocation: false,
      followZoomLevel: 13,
      center: [100.5018, 13.7563],
      location: {
        lng: 100.5018,
        lat: 13.7563,
      },
      address: '',
      isDoneFetching: true,
      isDisableButton: true,
      isUserLocationMarked: false,
      isEnterAgain: false,
    };

    this.setLocation = this.setLocation.bind(this);
  }

  UNSAFE_componentWillMount() {
    const {params} = this.props.route;
    if (params.data[0].lng !== undefined && params.data[0].lat !== undefined) {
      this.setState({
        location: params.data[0],
        address: params.data[1],
        center: [params.data[0].lng, params.data[0].lat],
        isDisableButton: false,
        isUserLocationMarked: true,
        followUserLocation: false,
        isEnterAgain: true,
      });
    }

    if (Platform.OS === 'android') {
      this.requestLocationPermission();
    }
  }

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  fetchAddress = (lng, lat) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?language=th&access_token=pk.eyJ1Ijoia253Y2giLCJhIjoiY2s5Zno2cGg2MGdqazNubzkzaHIzZmppMyJ9.mSjQ3XOe2IKTm1Ub-TwJZw&limit=1`,
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          address: json.features[0].place_name,
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isDoneFetching: true, isDisableButton: false});
      });
  };

  setLocation = (lng, lat) => {
    const {isDoneFetching} = this.state;
    if (isDoneFetching === true) {
      this.setState({
        location: {
          lng: lng,
          lat: lat,
        },
        isDoneFetching: false,
        isDisableButton: true,
      });
      this.fetchAddress(lng, lat);
    }
  };

  onPressLocation = e => {
    const {geometry} = e;
    this.setLocation(geometry.coordinates[0], geometry.coordinates[1]);
  };

  onUserLocation = e => {
    const {isUserLocationMarked} = this.state;
    if (isUserLocationMarked === false && e != null) {
      this.setState({isUserLocationMarked: true});
      this.setLocation(e.coords.longitude, e.coords.latitude);
    }
  };

  render() {
    const {followUserLocation, followZoomLevel, location, center} = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            ref={ref => (this.map = ref)}
            style={styles.map}
            onPress={this.onPressLocation}
            onDidFinishRenderingMapFully={r => {
              if (this.state.isEnterAgain === false) {
                this.setState({followUserLocation: true});
              }
            }}>
            {console.log(this.state)}
            <MapboxGL.UserLocation
              visible={false}
              onUpdate={this.onUserLocation}
            />
            <MapboxGL.Camera
              defaultSettings={{
                centerCoordinate: center,
                zoomLevel: 13,
              }}
              followUserLocation={followUserLocation}
              followZoomLevel={followZoomLevel}
              followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
            />
            <MapboxGL.MarkerView
              coordinate={[location.lng, location.lat]}
              anchor={{x: 0.5, y: 1}}>
              <Image
                style={styles.marker}
                source={require('../../../assets/marker.png')}
              />
            </MapboxGL.MarkerView>
          </MapboxGL.MapView>
          <View style={styles.bottom}>
            <Button
              style={styles.button}
              size="medium"
              status="primary"
              disabled={this.state.isDisableButton}
              activeOpacity={0.8}
              onPress={() =>
                navigate('Forms', {
                  data: [this.state.location, this.state.address],
                })
              }>
              <Text style={styles.buttonText}>ปักหมุดสถานที่</Text>
            </Button>
          </View>
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
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'relative',
    marginLeft: 42,
    marginRight: 42,
    marginBottom: 12,
    bottom: 0,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Kanit-Regular',
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    top: '90%',
    zIndex: 10,
  },
  marker: {
    width: 40,
    height: 40,
  },
});
