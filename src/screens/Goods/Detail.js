import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Layout, Text, Divider} from '@ui-kitten/components';

function Detail({route, navigation}) {
  const {post} = route.params;
  return (
    <Layout style={styles.layout} level="3">
      <ScrollView>
        <Text style={styles.header}>{post.topic}</Text>

        <Text style={styles.label} appearance="hint">
          สินค้า
        </Text>
        <Text style={styles.detail}>{post.goods}</Text>

        <Text style={styles.label} appearance="hint">
          รายละเอียดสินค้า
        </Text>
        <Text style={styles.detail}>
          {(() => {
            if (post.describe === '') {
              return 'ไม่ระบุ';
            } else {
              return post.describe;
            }
          })()}
        </Text>

        <Layout style={styles.row} level="3">
          <View style={styles.rowContent}>
            <Text style={styles.label} appearance="hint">
              ราคา
            </Text>
            <Text style={styles.detail}>{post.price} บาท</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.label} appearance="hint">
              ประเภท
            </Text>
            <Text style={styles.detail}>{post.type}</Text>
          </View>
        </Layout>
        <Layout style={styles.row} level="3">
          <View style={styles.rowContent}>
            <Text style={styles.label} appearance="hint">
              เบอร์ติดต่อ
            </Text>
            <Text style={styles.detail}>{post.phone}</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.label} appearance="hint">
              ช่องทางการติดต่อเพิ่มเติม
            </Text>
            <Text style={styles.detail}>
              {(() => {
                if (post.contact === '') {
                  return 'ไม่ระบุ';
                } else {
                  return post.contact;
                }
              })()}
            </Text>
          </View>
        </Layout>

        <Text style={styles.label} appearance="hint">
          สถานที่
        </Text>
        <Text style={styles.detail}>{post.location.address}</Text>

        <Divider style={styles.divider} />
      </ScrollView>
    </Layout>
  );
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
    backgroundColor: '#fafafa',
  },
  label: {
    marginTop: 14,
    fontSize: 12,
    fontFamily: 'Kanit-Light',
  },
  detail: {
    fontFamily: 'Kanit-Regular',
    color: '#2c3d70',
  },
  dividerLine: {
    marginTop: 14,
    borderBottomColor: 'rgb(228,231,237)',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
  },
  rowContent: {
    flex: 1,
  },
  header: {
    color: '#2c3d70',
    marginTop: 12,
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
  },
  divider: {
    margin: 40,
    borderBottomColor: 'rgb(228,231,237)',
    borderBottomWidth: 2,
  },
});

export default Detail;
