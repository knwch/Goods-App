import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Lists from '../screens/Goods/Lists';
import Detail from '../screens/Goods/Detail';
import Forms from '../screens/Goods/Forms/Forms';
import MapPicker from '../screens/Goods/Forms/MapPicker';
import {connect} from 'react-redux';
import {Divider, Layout, Text, Button} from '@ui-kitten/components';

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
    const {navigate} = this.props.navigation;
    return (
      <Layout style={styles.layout} level="3">
        <Text style={styles.header}>
          ลงชื่อเข้าใช้งานเพื่อเริ่มต้นเพิ่มสินค้าของคุณ
        </Text>
        <Divider style={styles.dividerLine} />
        <Button
          onPress={() => navigate('Account')}
          style={styles.button}
          size="small"
          status="primary"
          appearance="outline"
          activeOpacity={0.2}>
          <Text style={styles.SignInLabel}>ลงชื่อเข้าใช้</Text>
        </Button>
      </Layout>
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
              name="Sign"
              component={this.buttonScreen}
              options={{title: 'My Goods'}}
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
              name="Detail"
              component={Detail}
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

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#edf1f7',
  },
  header: {
    color: '#2c3d70',
    marginTop: 18,
    fontFamily: 'Kanit-Light',
    fontSize: 16,
    alignSelf: 'center',
  },
  SignInTouch: {
    marginTop: 22,
    alignSelf: 'center',
  },
  SignInLabel: {
    alignSelf: 'flex-end',
    fontFamily: 'Kanit-Medium',
    color: '#2c3d70',
  },
  button: {
    marginTop: 24,
    margin: 14,
    alignSelf: 'center',
    backgroundColor: 'rgba(225,225,225,0.1)',
    borderColor: '#2c3d70',
  },
  dividerLine: {
    marginTop: 14,
    borderBottomColor: 'rgb(228,231,237)',
    borderBottomWidth: 1,
  },
});

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStatetoProps)(GoodStackScreen);
