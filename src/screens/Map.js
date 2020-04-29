import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Text} from '@ui-kitten/components';
import BottomSheet from 'reanimated-bottom-sheet';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoia253Y2giLCJhIjoiY2s5Zno2cGg2MGdqazNubzkzaHIzZmppMyJ9.mSjQ3XOe2IKTm1Ub-TwJZw',
);

export default class Map extends Component {
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

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  renderContent = () => (
    <View style={styles.panel}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.panelTitle}>San Francisco Airport</Text>
        <Text style={styles.panelSubtitle}>
          International Airport - 40 miles away
        </Text>
        <View style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Directions</Text>
        </View>
        <View style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Search Nearby</Text>
        </View>
      </ScrollView>
    </View>
  );

  render() {
    const {followUserLocation, followZoomLevel} = this.state;

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
          </MapboxGL.MapView>
          <BottomSheet
            snapPoints={[400, 300, 0]}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            initialSnap={2}
          />
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
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: '100%',
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 36,
    height: 5,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
