import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/Account';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import {connect} from 'react-redux';
const AccountStack = createStackNavigator();

class AccountStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedata: ['Developer', 'Designer', 'Product Manager'],
      userToken: null,
    };
  }

  render() {
    return (
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
        {this.props.auth.isAuthenticated === false ? (
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
    );
  }
}

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStatetoProps)(AccountStackScreen);
