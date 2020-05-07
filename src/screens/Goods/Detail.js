import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';

function Detail({route, navigation}) {
  const {post} = route.params;
  return (
    <Layout level="3">
      <Text>หัวข้อ : {post.topic}</Text>
      <Text>ประเภท : {post.type}</Text>
      <Text>สินค้า : {post.goods}</Text>
      <Text>ราคา : {post.price}</Text>
      <Text>รายละเอียด : {post.describe}</Text>
      <Text>เบอร์ติดต่อ : {post.phone}</Text>
      <Text>ช่องทางการติดต่อเพิ่มเติม : {post.contact}</Text>
      <Text>สถานที่ : {post.location.address}</Text>
      <Button onPress={() => navigation.navigate('Lists')}>
        กลับสู่หน้าหลัก
      </Button>
    </Layout>
  );
}

export default Detail;
