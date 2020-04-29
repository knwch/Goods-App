import React, {Component} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {Layout, Button, Card, Text} from '@ui-kitten/components';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  HomeScreen = () => {
    const {navigate} = this.props.navigation;
    return (
      <Layout style={styles.container}>
        <Layout style={styles.coverContainer}>
          <ImageBackground
            style={styles.image}
            source={require('../assets/top-map.jpg')}
            resizeMode="cover">
            <View style={styles.buttonSection}>
              <Button style={styles.button} onPress={() => navigate('Map')}>
                Discover Goods
              </Button>
            </View>
          </ImageBackground>
        </Layout>
        <Layout style={styles.cardContainer}>
          <Card style={styles.card} status="basic">
            <Text>Statistics</Text>
          </Card>

          <Card style={styles.card} status="basic">
            <Text>Announces</Text>
          </Card>
        </Layout>
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
  coverContainer: {
    flex: 0.6,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  buttonSection: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    shadowRadius: 120,
  },
  cardContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 0.5,
    margin: 8,
  },
});
