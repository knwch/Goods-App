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
      center: [100.5018, 13.7563],
      location: {
        lng: undefined,
        lat: undefined,
      },
      address: '',
      isLoading: false,
      isDoneFetching: true,
      isDisableButton: true,
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
      });
    }
  }

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

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

  setLocation = e => {
    const {geometry} = e;
    const {isDoneFetching} = this.state;
    if (isDoneFetching === true) {
      this.setState({
        location: {
          lng: geometry.coordinates[0],
          lat: geometry.coordinates[1],
        },
        isDoneFetching: false,
        isDisableButton: true,
      });
      this.fetchAddress(geometry.coordinates[0], geometry.coordinates[1]);
    }
  };

  render() {
    const {followUserLocation, followZoomLevel, location, center} = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          {console.log(center)}
          <MapboxGL.MapView
            ref={ref => (this.map = ref)}
            style={styles.map}
            logoEnabled={false}
            onPress={this.setLocation}>
            <MapboxGL.UserLocation />
            <MapboxGL.Camera
              defaultSettings={{
                centerCoordinate: center,
                zoomLevel: 13,
              }}
              followUserLocation={followUserLocation}
              followZoomLevel={followZoomLevel}
            />
            <MapboxGL.PointAnnotation
              id="marked"
              coordinate={[location.lng, location.lat]}
            />
            <View style={styles.bottom}>
              <Button
                style={styles.button}
                size="medium"
                status="primary"
                disabled={this.state.isDisableButton}
                onPress={() =>
                  navigate('Forms', {
                    data: [this.state.location, this.state.address],
                  })
                }>
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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
