import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/Account';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const AccountStack = createStackNavigator();

export default class AccountStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedata: ['Developer', 'Designer', 'Product Manager'],
      userToken: null,
    };
  }

  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <AccountStack.Navigator
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
          {this.state.userToken == null ? (
            <>
              <AccountStack.Screen
                name="Signin"
                component={Signin}
                options={{title: 'Signin'}}
              />
              <AccountStack.Screen
                name="Signup"
                component={Signup}
                options={{title: 'Signup'}}
              />
            </>
          ) : (
            <>
              <AccountStack.Screen name="Account" component={Account} />
            </>
          )}
        </AccountStack.Navigator>
      </ApplicationProvider>
    );
  }
}
