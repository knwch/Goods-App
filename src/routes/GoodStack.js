import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Lists from '../screens/Goods/Lists';
import Forms from '../screens/Goods/Forms/Forms';
import MapPicker from '../screens/Goods/Forms/MapPicker';

const GoodStack = createStackNavigator();

export default function GoodStackScreen() {
  return (
    <GoodStack.Navigator
      initialRouteName="Lists"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2c3d70',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <GoodStack.Screen
        name="Lists"
        component={Lists}
        options={{title: 'My Goods'}}
      />
      <GoodStack.Screen
        name="Forms"
        component={Forms}
        options={{title: 'New Goods'}}
      />
      <GoodStack.Screen
        name="MapPicker"
        component={MapPicker}
        options={{title: 'New Goods', headerBackTitle: ' '}}
      />
    </GoodStack.Navigator>
  );
}
