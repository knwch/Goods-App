import React, {Component} from 'react';
import _ from 'lodash';
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
import {Text, Drawer, DrawerItem, Divider} from '@ui-kitten/components';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import BottomSheet from 'reanimated-bottom-sheet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {getPostAll} from '../redux/actions/postActions';
import icoMoonConfig from '../selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoia253Y2giLCJhIjoiY2s5Zno2cGg2MGdqazNubzkzaHIzZmppMyJ9.mSjQ3XOe2IKTm1Ub-TwJZw',
);

const HackMarker = ({children}) =>
  Platform.select({
    ios: children,
    android: <View>{children}</View>,
  });

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      initialSnap: 2,
      selectedPost: {},
      filterData: ['ทั้งหมด', 'อาหาร', 'เจลหรือหน้ากากอนามัย', 'อื่นๆ'],
      filterIndex: '',
      filter: 'ทั้งหมด',
      followUserLocation: false,
      followZoomLevel: 13,
      isAndroidAllow: false,
    };

    this.bottomSheetRef = React.createRef();
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS === 'android') {
      this.requestLocationPermission();
    }
  }

  async componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    await this.props.getPostAll();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      posts: this.props.post.posts,
    });
    console.log('Post map');
  }

  componentDidUpdate(prevProps) {
    if (this.props.post.posts.length !== prevProps.post.posts.length) {
      console.log('update new posts');
      this.setState({
        posts: this.props.post.posts,
      });
    }
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          isAndroidAllow: true,
        });
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  FoodIcon = () => (
    <Ionicons name="silverware-fork-knife" size={18} color="#f3705b" />
  );

  MedicIcon = () => <Ionicons name="medical-bag" size={18} color="#6cd16c" />;

  PackageIcon = () => (
    <Ionicons name="package-variant" size={18} color="#9d795a" />
  );

  onSelectFilter = () => index => {
    const {filterData} = this.state;
    this.setState({
      filter: filterData[index.row],
      filterIndex: index,
    });
    this.drawer.closeDrawer();
  };

  labelDrawer = text => {
    return <Text style={styles.label}>{text}</Text>;
  };

  renderDrawer = () => {
    return (
      <>
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
        <Drawer
          selectedIndex={this.state.filterIndex}
          onSelect={this.onSelectFilter()}>
          <DrawerItem title={this.labelDrawer('ทั้งหมด')} />
          <DrawerItem
            accessoryRight={this.FoodIcon}
            title={this.labelDrawer('อาหาร')}
          />
          <DrawerItem
            accessoryRight={this.MedicIcon}
            title={this.labelDrawer('เจลหรือหน้ากากอนามัย')}
          />
          <DrawerItem
            accessoryRight={this.PackageIcon}
            title={this.labelDrawer('อื่นๆ')}
          />
        </Drawer>
      </>
    );
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  renderContent = () => {
    const {selectedPost} = this.state;

    if (!_.isEmpty(selectedPost)) {
      return (
        <View style={styles.panel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.layout} level="3">
              <Text style={styles.topic}>{selectedPost.topic}</Text>

              <Text style={styles.label} appearance="hint">
                สินค้า
              </Text>
              <Text style={styles.detail}>{selectedPost.goods}</Text>

              <Text style={styles.label} appearance="hint">
                รายละเอียดสินค้า
              </Text>
              <Text style={styles.detail}>
                {(() => {
                  if (selectedPost.describe === '') {
                    return 'ไม่ระบุ';
                  } else {
                    return selectedPost.describe;
                  }
                })()}
              </Text>

              <View style={styles.row} level="3">
                <View style={styles.rowContent}>
                  <Text style={styles.label} appearance="hint">
                    ราคา
                  </Text>
                  <Text style={styles.detail}>{selectedPost.price} บาท</Text>
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.label} appearance="hint">
                    ประเภท
                  </Text>
                  <Text style={styles.detail}>{selectedPost.type}</Text>
                </View>
              </View>
              <View style={styles.row} level="3">
                <View style={styles.rowContent}>
                  <Text style={styles.label} appearance="hint">
                    เบอร์ติดต่อ
                  </Text>
                  <Text style={styles.detail}>{selectedPost.phone}</Text>
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.label} appearance="hint">
                    ช่องทางการติดต่อเพิ่มเติม
                  </Text>
                  <Text style={styles.detail}>
                    {(() => {
                      if (selectedPost.contact === '') {
                        return 'ไม่ระบุ';
                      } else {
                        return selectedPost.contact;
                      }
                    })()}
                  </Text>
                </View>
              </View>

              <Text style={styles.label} appearance="hint">
                สถานที่
              </Text>
              <Text style={styles.detail}>{selectedPost.location.address}</Text>

              <Divider style={styles.divider} />
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.panel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.panelTitle}>Goods Team :</Text>
            <Text style={styles.panelSubtitle}>
              เลือก Marker บนแผนที่เพื่อดูรายละเอียดเพิ่มเติม
            </Text>
          </ScrollView>
        </View>
      );
    }
  };

  onAnnotationSelected = index => {
    const {posts} = this.state;
    this.setState({selectedPost: posts[index]});
    this.bottomSheetRef.current.snapTo(0);
  };

  onAnnotationDeselected = () => {
    this.bottomSheetRef.current.snapTo(2);
  };

  annotationRef = null;
  annotationComponent = (post, index) => {
    return (
      <MapboxGL.PointAnnotation
        key={index}
        id={post.id}
        anchor={{x: 0.5, y: 1}}
        coordinate={[
          parseFloat(post.location.longitude),
          parseFloat(post.location.latitude),
        ]}
        onDeselected={this.onAnnotationDeselected.bind(this)}
        onSelected={this.onAnnotationSelected.bind(this, index)}
        ref={ref => (this.annotationRef = ref)}>
        <HackMarker>
          {post.goods === 'อาหาร' ? (
            <Icon name="food" size={36} color="#f3705b" />
          ) : post.goods === 'เจลหรือหน้ากากอนามัย' ? (
            <Icon name="medic" size={36} color="#6cd16c" />
          ) : (
            <Icon name="package" size={36} color="#9d795a" />
          )}
          {/* {(() => {
            if (post.goods === 'อาหาร') {
              return <Icon name="food" size={36} color="#f3705b" />;
            } else if (post.goods === 'เจลหรือหน้ากากอนามัย') {
              return <Icon name="medic" size={36} color="#6cd16c" />;
            } else {
              return <Icon name="package" size={36} color="#9d795a" />;
            }
          })()} */}
        </HackMarker>
      </MapboxGL.PointAnnotation>
    );
  };

  onRefresh = async () => {
    await this.props.getPostAll();
  };

  renderAnnotations = () => {
    console.log('Run');
    const {posts, filter} = this.state;

    const items = [];

    if (!_.isEmpty(posts)) {
      posts.map((post, index) => {
        if (filter === 'ทั้งหมด') {
          items.push(this.annotationComponent(post, index));
        } else if (post.goods === filter) {
          items.push(this.annotationComponent(post, index));
        }
      });
    }

    return items;
  };

  render() {
    const {followUserLocation, followZoomLevel, initialSnap} = this.state;

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
                  if (Platform.OS === 'android' && this.state.isAndroidAllow) {
                    this.setState({followUserLocation: true});
                  } else if (Platform.OS === 'ios') {
                    this.setState({followUserLocation: true});
                  }
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
                {this.renderAnnotations()}
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
              <View style={styles.refresh}>
                <TouchableOpacity
                  hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
                  onPress={this.onRefresh}>
                  <Ionicons name="refresh" size={38} color="#2c3d70" />
                </TouchableOpacity>
              </View>
              <BottomSheet
                ref={this.bottomSheetRef}
                snapPoints={[350, 200, 40]}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                initialSnap={initialSnap}
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
    height: Platform.OS === 'ios' ? '100%' : 425,
    // padding: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.95)',
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
    color: '#2c3d70',
    fontFamily: 'Kanit-Regular',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
    fontFamily: 'Kanit-Regular',
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
  marker: {
    width: 32,
    height: 32,
  },
  topic: {
    color: '#2c3d70',
    marginTop: 12,
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
  },
  label: {
    marginTop: 14,
    fontSize: 12,
    fontFamily: 'Kanit-Light',
  },
  labelDrawer: {
    color: '#2c3d70',
    fontFamily: 'Kanit-Regular',
  },
  detail: {
    fontFamily: 'Sarabun-Regular',
    color: '#2c3d70',
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContent: {
    flex: 1,
  },
  divider: {
    margin: 20,
  },
  refresh: {
    position: 'absolute',
    right: '6%',
    bottom: '10%',
    zIndex: 10,
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
