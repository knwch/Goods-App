import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Lists from '../screens/Goods/Lists';
import Forms from '../screens/Goods/Forms/Forms';
import MapPicker from '../screens/Goods/Forms/MapPicker';
import {connect} from 'react-redux';
import {Button, Text} from '@ui-kitten/components';

const GoodStack = createStackNavigator();

class GoodStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedata: ['Developer', 'Designer', 'Product Manager'],
      userToken: null,
    };
  }

  buttonScreen = () => {
    return (
      <>
        <Button
          onPress={() => this.props.navigation.navigate('Account')}
          size="medium"
          status="primary">
          เข้าสู่ระบบ
        </Button>
      </>
    );
  };

  render() {
    return (
      <GoodStack.Navigator
        initialRouteName="Lists"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2c3d70',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },
          headerTitleAlign: 'center',
        }}>
        {this.props.auth.isAuthenticated === false ? (
          <>
            <GoodStack.Screen
              name="Signin"
              component={this.buttonScreen}
              options={{title: 'Tesst'}}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </GoodStack.Navigator>
    );
  }
}

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStatetoProps)(GoodStackScreen);
