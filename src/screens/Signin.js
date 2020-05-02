import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Layout, Input, Button, Text} from '@ui-kitten/components';
import {signinUser} from '../redux/actions/authActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
    };
  }

  componentDidMount() {
    const state = this.state;
    console.log('Signin');
    if (this.props.auth.isAuthecticated === true) {
      this.props.navigation.navigate('Home');
    }
    this.setState({
      ...state,
      loading: this.props.auth.loading,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.loading !== prevProps.auth.loading) {
      this.setState({
        loading: this.props.auth.loading,
      });
    }
  }

  onChangeText = name => text => this.setState({[name]: text});

  toggleSecureEntry = () => {
    const {secureTextEntry} = this.state;
    this.setState({secureTextEntry: !secureTextEntry});
  };

  renderIcon = () => (
    <TouchableOpacity
      hitSlop={{top: 30, left: 30, bottom: 15, right: 30}}
      onPress={this.toggleSecureEntry}>
      <Ionicons
        name={this.state.secureTextEntry ? 'eye-off' : 'eye'}
        size={16}
        color="#213263"
      />
    </TouchableOpacity>
  );

  labelInput = text => {
    return (
      <Text style={styles.textColor} category="label">
        {text}
      </Text>
    );
  };

  onSubmit = async () => {
    const _user_data = this.state;
    delete _user_data.secureTextEntry;
    await this.props.signinUser(_user_data);
  };

  render() {
    const {navigate} = this.props.navigation;
    const {email, password, secureTextEntry} = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        // eslint-disable-next-line eqeqeq
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Layout style={styles.layout} level="3">
            <Spinner
              visible={this.state.loading}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <Input
              style={styles.inputForm}
              value={email}
              name="email"
              autoCapitalize="none"
              label={this.labelInput('อีเมล')}
              onChangeText={this.onChangeText('email')}
            />
            <Input
              style={styles.inputForm}
              value={password}
              name="password"
              accessoryRight={this.renderIcon}
              secureTextEntry={secureTextEntry}
              label={this.labelInput('รหัสผ่าน')}
              onChangeText={this.onChangeText('password')}
            />
            <TouchableOpacity
              style={styles.registerTouch}
              hitSlop={{top: 15, left: 30, bottom: 30, right: 30}}
              onPress={() => navigate('Signup')}>
              <Text style={styles.registerLabel} category="label">
                ลงทะเบียนที่นี่
              </Text>
            </TouchableOpacity>
            <Button
              onPress={this.onSubmit}
              style={styles.button}
              size="medium"
              status="primary">
              เข้าสู่ระบบ
            </Button>
          </Layout>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf1f7',
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 14,
  },
  inputForm: {
    marginTop: 12,
    marginLeft: 24,
    marginRight: 24,
  },
  button: {
    marginTop: 24,
    margin: 14,
    alignSelf: 'center',
    backgroundColor: '#2c3d70',
    borderColor: '#2c3d70',
  },
  textColor: {
    color: '#2c3d70',
  },
  registerTouch: {
    marginTop: 12,
    marginRight: 24,
    alignSelf: 'flex-end',
  },
  registerLabel: {
    color: '#2c3d70',
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({signinUser}, dispatch);
};

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Signin);
