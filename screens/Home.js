import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';

export default class Lists extends Component {
  constructor(props) {
    super(props);
  }

  HomeScreen = () => {
    const {navigate} = this.props.navigation;
    return (
      <Layout style={styles.container}>
        {/* <ImageBackground
          style={styles.image}
          source={require('../components/images/map-display.jpg')}>
          <View style={styles.image}>
            <Text>Home screen</Text>
            <Button onPress={() => navigate('Map')}>Discover</Button>
          </View>
        </ImageBackground> */}
        <Text>Home screen</Text>
        <Button onPress={() => navigate('Map')}>Discover</Button>
      </Layout>
    );
  };

  render() {
    const HomeScreen = this.HomeScreen;

    return <HomeScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
