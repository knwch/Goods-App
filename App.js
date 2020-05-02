import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, Provider} from 'react-redux';
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
Ionicons.loadFont();

const Tab = createBottomTabNavigator();

const getToken = async () => {
  try {
    console.log('function');
    const token = await Keychain.getGenericPassword();
    if (token) {
      setAuthToken(token);
      const decoded = jwt_decode(token);
      store.dispatch(setCurrentUser(decoded));
      if (decoded.exp < Date.now() / 1000) {
        store.dispatch(signoutUser());
      }
    } else {
      console.log('login');
    }
  } catch (err) {
    console.error(err);
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
                if (route.name === 'Home') {
                  return (
                    <Ionicons
                      name={focused ? 'home' : 'home-outline'}
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
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="My Goods" component={GoodStack} />
            <Tab.Screen name="Account" component={AccountStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );
}
