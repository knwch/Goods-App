import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {Layout, Text, Divider} from '@ui-kitten/components';
import {signoutUser} from '../redux/actions/authActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
  }

  componentDidMount() {
    const {user} = this.props.auth;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      email: user.email,
      name: user.name,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.loading !== prevProps.auth.loading) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        loading: this.props.auth.loading,
      });
    }
  }

  onLogout = async () => {
    await this.props.signoutUser();
  };

  render() {
    const {email, name} = this.state;
    return (
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

          <Text style={styles.label} appearance="hint">
            อีเมล
          </Text>
          <Text style={styles.detail}>{email}</Text>

          <Text style={styles.label} appearance="hint">
            ชื่อจริง-นามสกุล
          </Text>
          <Text style={styles.detail}>{name}</Text>

          <Divider style={styles.dividerLine} />

          <TouchableOpacity
            style={styles.SignOutTouch}
            hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
            onPress={this.onLogout}>
            <Text style={styles.SignOutLabel} appearance="hint">
              ออกจากระบบ
            </Text>
          </TouchableOpacity>
        </Layout>
      </TouchableWithoutFeedback>
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
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#edf1f7',
  },
  label: {
    marginTop: 14,
    fontSize: 12,
    fontFamily: 'Kanit-Light',
    // color: '#2c3d70',
  },
  detail: {
    fontFamily: 'Kanit-Regular',
    color: '#2c3d70',
  },
  SignOutTouch: {
    marginTop: 22,
    alignSelf: 'center',
  },
  SignOutLabel: {
    alignSelf: 'flex-end',
    fontFamily: 'Kanit-Regular',
  },
  image: {
    marginTop: 20,
    alignSelf: 'center',
    width: 125,
    height: 50,
    resizeMode: 'contain',
  },
  dividerLine: {
    marginTop: 14,
    borderBottomColor: 'rgb(228,231,237)',
    borderBottomWidth: 1,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({signoutUser}, dispatch);
};

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Account);
