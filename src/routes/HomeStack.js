import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet} from 'react-native';
// import Home from '../screens/Home';
import Map from '../screens/Map';

const HomeStack = createStackNavigator();

export default class HomeStackScreen extends React.Component {
  render() {
    return (
      <HomeStack.Navigator
        initialRouteName="Map"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2c3d70',
            height: 90,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTitle: props => (
            <Image
              style={styles.image}
              source={require('../assets/goods-white.png')}
            />
          ),
        }}>
        {/* <HomeStack.Screen name="Home" component={Home} /> */}
        <HomeStack.Screen
          name="Map"
          component={Map}
          options={{
            headerBackTitle: ' ',
          }}
        />
      </HomeStack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 95,
    height: 95,

    resizeMode: 'contain',
  },
});
