import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoodStack from './src/routes/GoodStack';
import HomeStack from './src/routes/HomeStack';
import AccountStack from './src/routes/AccountStack';
import {connect, Provider} from 'react-redux/';
import store from './src/redux/store';
Ionicons.loadFont();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
                    name={focused ? 'account-circle' : 'account-circle-outline'}
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
  );
}
