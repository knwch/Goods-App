import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Text, Drawer, DrawerItem} from '@ui-kitten/components';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import BottomSheet from 'reanimated-bottom-sheet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPostAll} from '../redux/actions/postActions';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoia253Y2giLCJhIjoiY2s5Zno2cGg2MGdqazNubzkzaHIzZmppMyJ9.mSjQ3XOe2IKTm1Ub-TwJZw',
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      followUserLocation: false,
      followZoomLevel: 13,
    };
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS === 'android') {
      this.requestLocationPermission();
    }
  }

  async componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    await this.props.getPostAll();
    this.setState({
      posts: this.props.post.posts,
    });
    console.log('Post map');
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

  renderDrawer = () => {
    return (
      <View>
        <View style={styles.drawerHeader}>
          <Text style={styles.menuHeader}>สินค้า</Text>
          <TouchableOpacity
            hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
            onPress={() => this.drawer.closeDrawer()}>
            <Ionicons
              style={styles.backIcon}
              name="chevron-left"
              size={38}
              color="#2c3d70"
            />
          </TouchableOpacity>
        </View>
        <Drawer>
          <DrawerItem title="อาหาร" />
          <DrawerItem title="" />
        </Drawer>
      </View>
    );
  };

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
      <View style={styles.map}>
        <DrawerLayout
          ref={drawer => {
            this.drawer = drawer;
          }}
          drawerWidth={200}
          drawerPosition={DrawerLayout.positions.Left}
          drawerType="front"
          drawerBackgroundColor="#fff"
          renderNavigationView={this.renderDrawer}>
          <View style={styles.page}>
            <View style={styles.container}>
              <MapboxGL.MapView
                style={styles.map}
                onDidFinishRenderingMapFully={r => {
                  this.setState({followUserLocation: true});
                }}>
                <MapboxGL.UserLocation />
                <MapboxGL.Camera
                  defaultSettings={{
                    centerCoordinate: [100.5018, 13.7563],
                    zoomLevel: 13,
                  }}
                  followUserLocation={followUserLocation}
                  followZoomLevel={followZoomLevel}
                  followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
                />
              </MapboxGL.MapView>
              <View style={styles.menu}>
                <TouchableOpacity
                  hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
                  onPress={() => this.drawer.openDrawer()}>
                  <Ionicons
                    name="xbox-controller-menu"
                    size={38}
                    color="#2c3d70"
                  />
                </TouchableOpacity>
              </View>
              <BottomSheet
                snapPoints={[300, 200, 0]}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                initialSnap={2}
              />
            </View>
          </View>
        </DrawerLayout>
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
  menu: {
    position: 'absolute',
    left: '5%',
    top: '4%',
    zIndex: 10,
  },
  menuHeader: {
    color: '#2c3d70',
    marginLeft: 12,
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
  },
  drawerHeader: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getPostAll}, dispatch);
};

const mapStatetoProps = state => {
  return {
    post: state.post,
    errors: state.errors,
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Map);
