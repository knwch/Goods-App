import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Layout, Input, Button, Select, SelectItem} from '@ui-kitten/components';
import KeyboardShift from '../../../components/KeyboardShift.js';

const ChevronIcon = () => (
  <Ionicons name={'chevron-down'} size={20} color="#8f9bb3" />
);

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedata: ['Developer', 'Designer', 'Product Manager'],
      title: '',
      type: '',
    };
  }

  onChange = event => {
    this.setState({value: event});
  };

  FormScreen = () => {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardShift>
        {() => (
          <Layout style={styles.container} level="2">
            <ScrollView>
              <Layout style={styles.layout} level="2">
                <Input
                  style={styles.inputform}
                  // value={value}
                  name="title"
                  label="หัวข้อ *"
                  placeholder="ระบุตามที่ต้องการ"
                  // accessoryRight={renderIcon}
                  // captionIcon={AlertIcon}
                  // secureTextEntry={secureTextEntry}
                  onChangeText={this.onChange}
                />
                <Layout style={styles.row} level="2">
                  <Select
                    style={styles.select}
                    name="goods"
                    label="สินค้า *"
                    placeholder="เลือก"
                    accessoryRight={ChevronIcon}
                    onSelect={index => this.setState({index})}>
                    <SelectItem title="Option 1" />
                    <SelectItem title="Option 2" />
                    <SelectItem title="Option 3" />
                  </Select>
                  <Input
                    style={styles.select}
                    // value={value}
                    name="price"
                    label="ราคา *"
                    caption="ใส่เลข 0 เมื่อต้องการบริจาคสินค้า"
                    placeholder="เช่น 42 - 80"
                    onChangeText={this.onChange}
                  />
                </Layout>
                <Input
                  style={styles.inputform}
                  // value={value}
                  name="detail"
                  label="รายละเอียดสินค้าเพิ่มเติม"
                  placeholder=""
                  onChangeText={this.onChange}
                />
                <Input
                  style={styles.inputform}
                  // value={value}
                  name="telephone"
                  label="เบอร์ติดต่อ"
                  placeholder="เช่น 0824686293"
                  onChangeText={this.onChange}
                />
                <Input
                  style={styles.inputform}
                  // value={value}
                  name="contact"
                  label="ช่องทางการติดต่อเพิ่มเติม"
                  placeholder="เช่น Line, Facebook"
                  onChangeText={this.onChange}
                />
                <Input
                  style={styles.inputform}
                  // value={value}
                  name="address"
                  label="ปักหมุดสถานที่ *"
                  placeholder="กดสัญลักษณ์ด้านขวาเพื่อปักหมุด"
                  accessoryRight={() => (
                    <TouchableOpacity
                      hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
                      onPress={() => navigate('MapPicker')}>
                      <Ionicons
                        name={'crosshairs-gps'}
                        size={16}
                        color="#8f9bb3"
                      />
                    </TouchableOpacity>
                  )}
                  onChangeText={this.onChange}
                />
              </Layout>
              <Button style={styles.button} size="medium" status="primary">
                เพิ่มสินค้า
              </Button>
            </ScrollView>
          </Layout>
        )}
      </KeyboardShift>
    );
  };

  render() {
    const FormScreen = this.FormScreen;
    return <FormScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    flex: 1,
    margin: 2,
  },
  layout: {
    marginLeft: 14,
    marginRight: 14,
  },
  inputform: {
    marginTop: 12,
  },
  button: {
    margin: 14,
  },
});
