import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {Image, Dimensions} from 'react-native';
import Home from '../screens/Home';
import Map from '../screens/Map';

const HomeStack = createStackNavigator();

// const {width} = Dimensions.get('window');

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(0,145,255)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Goods',
          // headerTitle: (
          //   <Image
          //     style={{width: width, height: 150}}
          //     source={require('../components/images/goods.png')}
          //   />
          // ),
        }}
      />
      <HomeStack.Screen
        name="Map"
        component={Map}
        options={{title: 'Discover'}}
      />
    </HomeStack.Navigator>
  );
}
