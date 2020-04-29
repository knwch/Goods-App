import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Layout, Input, Button} from '@ui-kitten/components';

export default class Signup extends Component {
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

  onChangeText = name => text => this.setState({[name]: text});

  labelInput = text => {
    return <Text style={styles.textColor}>{text}</Text>;
  };

  render() {
    const {email, password, passwordConfirm, fname, lname} = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Layout style={styles.container} level="3">
            <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={100}
              enabled>
              <Layout style={styles.layout} level="3">
                <Input
                  style={styles.inputForm}
                  value={email}
                  name="email"
                  autoCapitalize="characters"
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
              </Layout>
              <Button style={styles.button} size="medium" status="primary">
                ลงทะเบียน
              </Button>
            </KeyboardAvoidingView>
          </Layout>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    margin: 2,
  },
  layout: {
    marginLeft: 14,
    marginRight: 14,
  },
  inputForm: {
    marginTop: 12,
  },
  button: {
    margin: 14,
    backgroundColor: '#2c3d70',
    borderColor: '#2c3d70',
  },
  textColor: {
    color: '#2c3d70',
  },
});
