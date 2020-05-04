import React, {Component} from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Layout, Input, Button, Modal, Card} from '@ui-kitten/components';
import {signupUser} from '../redux/actions/authActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import validate from '../validation/validation';
import Modalerrors from './Goods/Modal/Errorsmodal';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      fname: '',
      lname: '',
      validation: {},
      isRegistered: false,
      isErrors: false,
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.navigation.navigate('Map');
    }
    console.log('Sign up');
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      console.log('Update error');
      this.setState({
        isErrors: !this.state.isErrors,
      });
    } else if (this.props.auth.success !== prevProps.auth.success) {
      console.log('success');
      this.setState({
        isRegistered: !this.state.isRegistered,
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
      } else if (name === 'passwordConfirm') {
        validation[name] = validate('confirmPassword', {
          password: this.state.password,
          confirmPassword: text,
        });
      } else if (name === 'fname' || name === 'lname') {
        validation[name] = validate('input', text);
      }
    }
  };

  labelInput = text => {
    return <Text style={styles.label}>{text}</Text>;
  };

  renderInputStatus = name => {
    const {validation} = this.state;
    return validation[name] == null ? 'basic' : 'danger';
  };

  successRegisterModal = () => {
    this.setState({isRegistered: true});
  };

  closeRegisterModal = () => {
    const {goBack} = this.props.navigation;
    goBack();
  };

  onModalErrors = () => {
    this.setState({isErrors: !this.state.isErrors});
  };

  onSubmit = async () => {
    const {email, password, passwordConfirm, fname, lname} = this.state;

    var validation = {};
    validation.email = validate('email', email);
    validation.password = validate('password', password);
    validation.passwordConfirm = validate('confirmPassword', {
      password: password,
      confirmPassword: passwordConfirm,
    });
    validation.fname = validate('input', fname);
    validation.lname = validate('input', lname);

    if (
      !validation.email &&
      !validation.password &&
      !validation.passwordConfirm &&
      !validation.fname &&
      !validation.lname
    ) {
      // if all valid (all values are null) then...
      const user_data = {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        fname: fname,
        lname: lname,
      };
      await this.props.signupUser(user_data);
    } else {
      // if not valid then set validators to states
      this.setState({validation: validation});
    }
  };

  render() {
    const {
      email,
      password,
      passwordConfirm,
      fname,
      lname,
      validation,
      isRegistered,
      isErrors,
    } = this.state;
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
                visible={this.props.auth.loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />

              <Modal
                visible={isRegistered}
                backdropStyle={styles.backdrop}
                onBackdropPress={this.closeRegisterModal}>
                <Card disabled={true}>
                  <Text style={styles.modalLabel}>ลงทะเบียนสำเร็จ</Text>
                  <Button onPress={this.closeRegisterModal}>
                    <Text style={styles.buttonText}>รับทราบ</Text>
                  </Button>
                </Card>
              </Modal>

              <Modalerrors
                isErrors={isErrors}
                closeErrorsModal={this.onModalErrors}
                message={this.props.errors}
              />

              <Text style={styles.header}>สมัครสมาชิก</Text>
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
                autoCapitalize="none"
                maxLength={30}
                secureTextEntry={true}
                status={this.renderInputStatus('password')}
                caption={validation.password}
                label={this.labelInput('รหัสผ่าน')}
                onChangeText={this.onChangeText('password')}
              />
              <Input
                style={styles.inputForm}
                textStyle={styles.placeholder}
                value={passwordConfirm}
                name="passwordConfirm"
                autoCapitalize="none"
                maxLength={30}
                secureTextEntry={true}
                status={this.renderInputStatus('passwordConfirm')}
                caption={validation.passwordConfirm}
                label={this.labelInput('ยืนยันรหัสผ่าน')}
                onChangeText={this.onChangeText('passwordConfirm')}
              />
              <Layout style={styles.row} level="3">
                <Input
                  style={styles.halfInput}
                  textStyle={styles.placeholder}
                  value={fname}
                  name="fname"
                  status={this.renderInputStatus('fname')}
                  caption={validation.fname}
                  label={this.labelInput('ชื่อจริง')}
                  onChangeText={this.onChangeText('fname')}
                />
                <Input
                  style={styles.halfInput}
                  textStyle={styles.placeholder}
                  value={lname}
                  name="lname"
                  status={this.renderInputStatus('lname')}
                  caption={validation.lname}
                  label={this.labelInput('นามสกุล')}
                  onChangeText={this.onChangeText('lname')}
                />
              </Layout>
              <Button
                style={styles.button}
                size="medium"
                status="primary"
                onPress={this.onSubmit}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>ลงทะเบียน</Text>
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
  buttonText: {
    color: '#FFF',
    fontFamily: 'Kanit-Regular',
  },
  label: {
    fontFamily: 'Sarabun-Medium',
    color: '#2c3d70',
  },
  modalLabel: {
    fontFamily: 'Kanit-Regular',
    marginBottom: 8,
    color: '#2c3d70',
  },
  placeholder: {
    fontFamily: 'Sarabun-Regular',
  },
  header: {
    color: '#2c3d70',
    marginTop: 12,
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    errors: state.errors,
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Signup);
