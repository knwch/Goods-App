import React, {Component} from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Layout, Input, Button, Text} from '@ui-kitten/components';
import {signinUser} from '../redux/actions/authActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import validate from '../validation/validation';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
      validation: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAutheticated === true) {
      this.props.navigation.navigate('Map');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.loading !== prevProps.auth.loading) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        loading: this.props.auth.loading,
      });
    }
  }

  onChangeText = name => text => {
    const {validation} = this.state;
    this.setState({[name]: text});

    // real-time check validate when user was submitted
    if (!_.isEmpty(validation)) {
      if (name === 'email') {
        validation[name] = validate('email', text);
      } else if (name === 'password') {
        validation[name] = validate('password', text);
      }
    }
  };

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
      <Text style={styles.label} category="label">
        {text}
      </Text>
    );
  };

  renderInputStatus = name => {
    const {validation} = this.state;
    return validation[name] == null ? 'basic' : 'danger';
  };

  onSubmit = async () => {
    const {email, password} = this.state;
    var validation = {};
    validation.email = validate('email', email);
    validation.password = validate('password', password);

    if (!validation.email && !validation.password) {
      // if all valid then...
      const user_data = {
        email: email,
        password: password,
      };
      await this.props.signinUser(user_data);
    } else {
      // if not valid then set validators to states
      this.setState({validation: validation});
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    const {email, password, secureTextEntry, validation} = this.state;
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
            <Image
              style={styles.image}
              source={require('../assets/goods-blue.png')}
            />
            <Input
              style={styles.inputForm}
              textStyle={styles.placeholder}
              value={email}
              name="email"
              keyboardType="email-address"
              autoCapitalize="none"
              status={this.renderInputStatus('email')}
              caption={validation.email}
              label={this.labelInput('อีเมล')}
              onChangeText={this.onChangeText('email')}
            />
            <Input
              style={styles.inputForm}
              textStyle={styles.placeholder}
              value={password}
              name="password"
              keyboardType="default"
              autoCapitalize="none"
              maxLength={30}
              accessoryRight={this.renderIcon}
              secureTextEntry={secureTextEntry}
              status={this.renderInputStatus('password')}
              caption={validation.password}
              label={this.labelInput('รหัสผ่าน')}
              onChangeText={this.onChangeText('password')}
            />
            <TouchableOpacity
              style={styles.registerTouch}
              hitSlop={{top: 15, left: 30, bottom: 30, right: 30}}
              onPress={() => navigate('Signup')}>
              <Text style={styles.registerLabel}>ลงทะเบียนที่นี่</Text>
            </TouchableOpacity>

            <Button
              onPress={this.onSubmit}
              style={styles.button}
              size="medium"
              status="primary"
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
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
  buttonText: {
    color: '#FFF',
    fontFamily: 'Kanit-Regular',
  },
  label: {
    fontFamily: 'Sarabun-Medium',
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
    fontFamily: 'Kanit-Regular',
    textDecorationLine: 'underline',
  },
  placeholder: {
    fontFamily: 'Sarabun-Regular',
  },
  image: {
    width: 125,
    height: 50,
    resizeMode: 'contain',
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
