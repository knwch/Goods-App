import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Layout, Input, Button} from '@ui-kitten/components';
import {signupUser} from '../redux/actions/authActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      fname: '',
      lname: '',
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.navigation.navigate('Home');
    }
    this.setState({
      ...this.state,
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

  labelInput = text => {
    return <Text style={styles.textColor}>{text}</Text>;
  };

  onSubmit = async () => {
    const _user_data = this.state;
    await this.props.signupUser(_user_data);
  };

  render() {
    const {email, password, passwordConfirm, fname, lname} = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        // eslint-disable-next-line eqeqeq
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
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
                secureTextEntry={true}
                label={this.labelInput('รหัสผ่าน')}
                onChangeText={this.onChangeText('password')}
              />
              <Input
                style={styles.inputForm}
                value={passwordConfirm}
                name="passwordConfirm"
                secureTextEntry={true}
                label={this.labelInput('ยืนยันรหัสผ่าน')}
                onChangeText={this.onChangeText('passwordConfirm')}
              />
              <Layout style={styles.row} level="3">
                <Input
                  style={styles.halfInput}
                  value={fname}
                  name="fname"
                  label={this.labelInput('ชื่อจริง')}
                  onChangeText={this.onChangeText('fname')}
                />
                <Input
                  style={styles.halfInput}
                  value={lname}
                  name="lname"
                  label={this.labelInput('นามสกุล')}
                  onChangeText={this.onChangeText('lname')}
                />
              </Layout>
              <Button
                style={styles.button}
                size="medium"
                status="primary"
                onPress={this.onSubmit}>
                ลงทะเบียน
              </Button>
            </Layout>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
  },
  halfInput: {
    flex: 1,
    margin: 2,
  },
  layout: {
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#fafafa',
  },
  inputForm: {
    marginTop: 12,
  },
  button: {
    margin: 14,
    alignSelf: 'flex-end',
    backgroundColor: '#2c3d70',
    borderColor: '#2c3d70',
  },
  textColor: {
    color: '#2c3d70',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({signupUser}, dispatch);
};

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Signup);
