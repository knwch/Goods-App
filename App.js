import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider} from 'react-redux';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import GoodStack from './src/routes/GoodStack';
import HomeStack from './src/routes/HomeStack';
import AccountStack from './src/routes/AccountStack';
import store from './src/redux/store';
import * as Keychain from 'react-native-keychain';
import setAuthToken from './src/utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {setCurrentUser, signoutUser} from './src/redux/actions/authActions';
let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'https://goods-service.herokuapp.com/';
Ionicons.loadFont();

const Tab = createBottomTabNavigator();

const getToken = async () => {
  try {
    const token = await Keychain.getGenericPassword();
    if (token) {
      const {password} = token;
      setAuthToken(password);
      const decoded = jwt_decode(password);
      store.dispatch(setCurrentUser(decoded));
      if (decoded.exp < Date.now() / 1000) {
        console.log('token exp');
        store.dispatch(signoutUser());
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export default function App() {
  React.useEffect(() => {
    console.log('componentwillmount');
    getToken();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                if (route.name === 'Discover') {
                  return (
                    <Ionicons
                      name={focused ? 'map-legend' : 'map-outline'}
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === 'My Goods') {
                  return (
                    <Ionicons
                      name={focused ? 'cube' : 'cube-outline'}
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === 'Account') {
                  return (
                    <Ionicons
                      name={
                        focused ? 'account-circle' : 'account-circle-outline'
                      }
                      size={size}
                      color={color}
                    />
                  );
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: 'rgb(33,50,99)',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Discover" component={HomeStack} />
            <Tab.Screen name="My Goods" component={GoodStack} />
            <Tab.Screen name="Account" component={AccountStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );
}
