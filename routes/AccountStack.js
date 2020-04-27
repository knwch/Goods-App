import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/Account';

const AccountStack = createStackNavigator();

export default function AccountStackScreen() {
  return (
    <AccountStack.Navigator initialRouteName="Account">
      <AccountStack.Screen name="Account" component={Account} />
    </AccountStack.Navigator>
  );
}
