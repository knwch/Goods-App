import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {signoutUser} from '../../redux/actions/authActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Detail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout level="3">
          <Text>topic</Text>

          <Text>details</Text>
        </Layout>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({signoutUser}, dispatch);
};

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    post: state.post,
    errors: state.errors,
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Detail);
