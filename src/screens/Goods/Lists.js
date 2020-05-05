import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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

  componentDidUpdate(prevProps) {
    if (this.props.post.postUser.length !== prevProps.post.postUser.length) {
      this.setState({
        posts: this.props.post.postUser,
      });
    } else if (this.props.post.success !== prevProps.post.success) {
      console.log('Update status post');
      const {statusPost, posts, index} = this.state;
      posts[index] = {
        ...posts[index],
        postStatus: statusPost,
      };
      this.setState({isModal: !this.state.isModal}, function() {
        console.log(this.state.posts[index]);
      });
    }
  }

  onSubmit = async () => {
    const {statusPost, posts, index} = this.state;
    const _data = {statusPost: statusPost};
    await this.props.statusPost(posts[index].id, _data);
  };

  onModal = (message, status, index) => {
    this.setState({
      isModal: !this.state.isModal,
      message: message,
      statusPost: status,
      index: index,
    });
  };

  ListScreen = () => {
    const {navigate} = this.props.navigation;
    const renderItem = ({item, index}) => (
      <ListItem
        title={`${item.topic}`}
        description={`${item.describe}`}
        accessoryRight={() =>
          item.postStatus ? (
            <Button
              size="tiny"
              appearance="outline"
              status="danger"
              onPress={() =>
                this.onModal('คุณต้องการปิดโพสใช่หรือไม่', false, index)
              }>
              Disable
            </Button>
          ) : (
            <Button
              size="tiny"
              appearance="outline"
              status="success"
              onPress={() =>
                this.onModal('คุณต้องการเปิดโพสใช่หรือไม่', true, index)
              }>
              Available
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
            <Button onPress={this.onSubmit} status="success">
              <Text style={styles.buttonText}>ตกลง</Text>
            </Button>
            <Text />
            <Button onPress={this.closeModal}>
              <Text style={styles.buttonText} status="danger">
                ยกเลิก
              </Text>
            </Button>
          </Card>
        </Modal>
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
  buttonText: {
    color: '#FFF',
    fontFamily: 'Kanit-Regular',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalLabel: {
    fontFamily: 'Kanit-Regular',
    marginBottom: 8,
    color: '#2c3d70',
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
