import * as React from 'react';
import {Button, Text, View} from 'react-native';

function AccountScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Account screen</Text>
      <Button title="Go to Details" />
    </View>
  );
}

export default function AccountStackScreen() {
  return <AccountScreen />;
}
