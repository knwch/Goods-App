import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet, View} from 'react-native';
import Home from '../screens/Home';
import Map from '../screens/Map';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const HomeStack = createStackNavigator();

export default class HomeStackScreen extends React.Component {
  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <HomeStack.Navigator
          initialRouteName="Home"
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
            headerTitle: (
              //<View>
              <Image
                style={styles.image}
                source={require('../assets/goods-white.png')}
              />
              //</View>
            ),
          }}>
          <HomeStack.Screen name="Home" component={Home} />
          <HomeStack.Screen
            name="Map"
            component={Map}
            options={{
              headerBackTitle: ' ',
            }}
          />
        </HomeStack.Navigator>
      </ApplicationProvider>
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
