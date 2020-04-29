import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Layout, Button, Divider, List, ListItem} from '@ui-kitten/components';

const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

const PlusIcon = () => (
  <Ionicons name={'plus-circle'} size={14} color="white" />
);

export default class Lists extends Component {
  constructor(props) {
    super(props);
  }

  ListScreen = () => {
    const {navigate} = this.props.navigation;
    const renderItem = ({item, index}) => (
      <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
        accessoryRight={() => (
          <Button size="tiny" appearance="outline" status="basic">
            Disable
          </Button>
        )}
      />
    );

    return (
      <Layout style={styles.container} level="2">
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
        <Layout level="2">
          <Button
            style={styles.button}
            status="primary"
            accessoryLeft={PlusIcon}
            onPress={() => navigate('Forms')}>
            Add new goods
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
    borderColor: '#005eb8',
    backgroundColor: '#005eb8',
    margin: 8,
  },
});
