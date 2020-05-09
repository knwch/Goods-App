import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Layout,
  Button,
  Divider,
  List,
  ListItem,
  Text,
  Modal,
  Card,
} from '@ui-kitten/components';
import {statusPost, getPostUser} from '../../redux/actions/postActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Modalerrors from '../Goods/Modal/Errorsmodal';

const PlusIcon = () => (
  <Ionicons name={'plus-circle'} size={14} color="white" />
);

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isModal: false,
      message: '',
      statusPost: false,
      isErrors: false,
    };
  }

  async componentDidMount() {
    console.log('List post');
    await this.props.getPostUser(this.props.auth.user.user_id);
    this.setState({
      ...this.state,
      posts: this.props.post.postUser,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post.postUser.length !== prevProps.post.postUser.length) {
      console.log('Update posts');
      this.setState({
        posts: this.props.post.postUser,
      });
    } else if (this.props.post.success !== prevProps.post.success) {
      const {statusPost, index} = this.state;
      console.log('Update status post');
      this.setState(prevState => ({
        posts: prevState.posts.map(post =>
          post.id === index ? {...post, postStatus: statusPost} : post,
        ),
      }));
    } else if (
      this.props.errors !== prevProps.errors &&
      !_.isEmpty(this.props.errors)
    ) {
      this.setState({isErrors: !this.state.isErrors});
    }
  }

  onSubmit = async () => {
    const {statusPost, index, isModal} = this.state;
    const _data = {statusPost: statusPost};
    this.setState({isModal: !isModal});
    await this.props.statusPost(index, _data);
  };

  onModal = (message, status, index) => {
    this.setState({
      isModal: !this.state.isModal,
      message: message,
      statusPost: status,
      index: index,
    });
  };

  closeModalError = () => {
    this.setState({isErrors: !this.state.isErrors});
  };

  closeModal = () => {
    this.setState({isModal: !this.state.isModal});
  };

  ListScreen = () => {
    const {navigate} = this.props.navigation;
    const renderItem = ({item, index}) => (
      <ListItem
        style={styles.listItem}
        title={`${item.topic}`}
        description={`${item.goods}`}
        onPress={() => navigate('Detail', {post: item})}
        accessoryRight={() =>
          item.postStatus ? (
            <Button
              size="tiny"
              appearance="ghost"
              status="success"
              onPress={() =>
                this.onModal(
                  `คุณต้องการปิดใช้งานโพสต์ ${item.topic} ใช่หรือไม่`,
                  false,
                  `${item.id}`,
                )
              }>
              กำลังเปิดใช้งาน
            </Button>
          ) : (
            <Button
              size="tiny"
              appearance="ghost"
              status="basic"
              onPress={() =>
                this.onModal(
                  `คุณต้องการเปิดใช้งานโพสต์ ${item.topic} ใช่หรือไม่`,
                  true,
                  `${item.id}`,
                )
              }>
              ปิดใช้งานแล้ว
            </Button>
          )
        }
      />
    );

    return (
      <Layout style={styles.container} level="2">
        <Spinner
          visible={this.props.post.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Modal
          visible={this.state.isModal}
          backdropStyle={styles.backdrop}
          onBackdropPress={this.closeModal}>
          <Card disabled={true}>
            <Text style={styles.modalLabel}>{this.state.message}</Text>
            <View style={styles.row}>
              <View style={styles.rowContent}>
                <Button
                  style={styles.buttonMargin}
                  onPress={this.closeModal}
                  appearance="outline"
                  status="basic">
                  <Text style={styles.buttonGhost}>ยกเลิก</Text>
                </Button>
              </View>
              <View style={styles.rowContent}>
                <Button
                  style={styles.buttonMargin}
                  onPress={this.onSubmit}
                  status="primary">
                  <Text style={styles.buttonText}>ยืนยัน</Text>
                </Button>
              </View>
            </View>
          </Card>
        </Modal>

        <Modalerrors
          isErrors={this.state.isErrors}
          message={this.props.errors}
          closeErrorsModal={this.closeModalError}
        />

        <List
          data={this.state.posts}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
        <Layout level="2">
          <Button
            style={styles.button}
            status="primary"
            accessoryLeft={PlusIcon}
            activeOpacity={0.8}
            onPress={() => navigate('Forms')}>
            <Text style={styles.buttonText}>เพิ่มสินค้าใหม่</Text>
          </Button>
        </Layout>
      </Layout>
    );
  };

  render() {
    const ListScreen = this.ListScreen;

    return <ListScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    borderColor: '#2c3d70',
    backgroundColor: '#2c3d70',
    margin: 8,
  },
  buttonMargin: {
    margin: 8,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Kanit-Regular',
  },
  buttonGhost: {
    fontFamily: 'Kanit-Regular',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  listItem: {
    paddingVertical: 18,
  },
  modalLabel: {
    fontFamily: 'Kanit-Regular',
    marginBottom: 8,
    color: '#2c3d70',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#edf1f7',
  },
  rowContent: {
    flex: 1,
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({statusPost, getPostUser}, dispatch);
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
)(Lists);
