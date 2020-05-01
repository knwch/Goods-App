import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Layout, Input, Button, Select, SelectItem} from '@ui-kitten/components';

const ChevronIcon = () => (
  <Ionicons name={'chevron-down'} size={20} color="#2c3d70" />
);

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeData: ['ขาย', 'บริจาค', 'แลกเปลี่ยน'],
      goodsData: ['อาหาร', 'เจลหรือหน้ากากอนามัย', 'อื่นๆ'],
      index: '',
      topic: '',
      type: '',
      goods: '',
      price: '',
      describe: '',
      phone: '',
      contact: '',
      location: {
        lng: undefined,
        lat: undefined,
      },
      address: '',
    };
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextProps.route.params != null) {
      if (nextProps.route.params.data[1] !== this.state.address) {
        this.setState({address: nextProps.route.params.data[1]});
      }

      if (
        nextProps.route.params.data[0].lng !== this.state.location.lng &&
        nextProps.route.params.data[0].lat !== this.state.location.lat
      ) {
        this.setState({location: nextProps.route.params.data[0]});
      }
    }
  }

  onChangeText = name => text => this.setState({[name]: text});

  onSelectOption = name => index => {
    const {typeData, goodsData} = this.state;
    if (name === 'type') {
      this.setState({[name]: typeData[index.row]});
    } else if (name === 'goods') {
      this.setState({[name]: goodsData[index.row]});
    }
  };

  labelInput = text => {
    return <Text style={styles.textColor}>{text}</Text>;
  };

  renderOption = title => <SelectItem title={title} />;

  render() {
    const {navigate} = this.props.navigation;
    const {
      typeData,
      goodsData,
      topic,
      type,
      goods,
      price,
      describe,
      phone,
      contact,
      address,
    } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        // eslint-disable-next-line eqeqeq
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Layout style={styles.layout} level="3">
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={topic}
                name="topic"
                label={this.labelInput('หัวข้อ *')}
                placeholder="ระบุตามที่ต้องการ"
                onChangeText={this.onChangeText('topic')}
              />
              <Select
                style={styles.inputform}
                value={type}
                name="type"
                label={this.labelInput('ประเภท *')}
                placeholder="เลือก"
                accessoryRight={ChevronIcon}
                onSelect={this.onSelectOption('type')}>
                {typeData.map(this.renderOption)}
              </Select>
              <Layout style={styles.row} level="3">
                <Select
                  style={styles.select}
                  value={goods}
                  name="goods"
                  label={this.labelInput('สินค้า *')}
                  placeholder="เลือก"
                  accessoryRight={ChevronIcon}
                  onSelect={this.onSelectOption('goods')}>
                  {goodsData.map(this.renderOption)}
                </Select>
                <Input
                  style={styles.select}
                  textStyle={styles.placeholder}
                  value={price}
                  name="price"
                  label={this.labelInput('ราคา *')}
                  placeholder="เช่น 42 - 80"
                  onChangeText={this.onChangeText('price')}
                />
              </Layout>
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={describe}
                name="describe"
                label={this.labelInput('รายละเอียดสินค้าเพิ่มเติม')}
                placeholder=""
                onChangeText={this.onChangeText('describe')}
              />
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={phone}
                name="phone"
                label={this.labelInput('เบอร์ติดต่อ')}
                placeholder="เช่น 0824686293"
                onChangeText={this.onChangeText('phone')}
              />
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={contact}
                name="contact"
                label={this.labelInput('ช่องทางการติดต่อเพิ่มเติม')}
                placeholder="เช่น Line, Facebook"
                onChangeText={this.onChangeText('contact')}
              />
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={address}
                name="address"
                label={this.labelInput('ปักหมุดสถานที่ *')}
                placeholder="กดสัญลักษณ์ด้านขวาเพื่อปักหมุด"
                accessoryRight={() => (
                  <TouchableOpacity
                    hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
                    onPress={() =>
                      navigate('MapPicker', {
                        data: [this.state.location, this.state.address],
                      })
                    }>
                    <Ionicons
                      name={'crosshairs-gps'}
                      size={16}
                      color="#213263"
                    />
                  </TouchableOpacity>
                )}
                onChangeText={this.onChangeText('address')}
              />
              <Button style={styles.button} size="medium" status="primary">
                ยืนยัน
              </Button>
            </Layout>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#edf1f7',
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#edf1f7',
  },
  select: {
    flex: 1,
    margin: 2,
  },
  layout: {
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#edf1f7',
  },
  inputform: {
    marginTop: 12,
  },
  button: {
    marginTop: 14,
    marginBottom: 14,
    backgroundColor: '#2c3d70',
    borderColor: '#2c3d70',
  },
  textColor: {
    fontFamily: 'Sarabun-Bold',
    color: '#2c3d70',
  },
  placeholder: {
    fontFamily: 'Sarabun-Regular',
  },
});
