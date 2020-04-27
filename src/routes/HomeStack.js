import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet} from 'react-native';
import Home from '../screens/Home';
import Map from '../screens/Map';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#005eb8',
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
          headerTitle: (
            <Image
              style={styles.image}
              source={require('../components/images/goods.png')}
            />
          ),
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

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
