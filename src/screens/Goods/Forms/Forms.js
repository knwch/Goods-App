import React, {Component} from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Layout,
  Input,
  Button,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import validate from '../../../validation/validation';

const ChevronIcon = () => (
  <Ionicons name={'chevron-down'} size={20} color="#2c3d70" />
);

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeData: ['ขาย', 'บริจาค', 'แลกเปลี่ยน'],
      goodsData: ['อาหาร', 'เจลหรือหน้ากากอนามัย', 'อื่นๆ'],
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
      validation: {},
    };
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const {validation} = this.state;
    if (nextProps.route.params != null) {
      // get data from MapPicker
      if (
        nextProps.route.params.data[0].lng !== this.state.location.lng &&
        nextProps.route.params.data[0].lat !== this.state.location.lat
      ) {
        this.setState({
          location: nextProps.route.params.data[0],
          address: nextProps.route.params.data[1],
        });
        // verify address validator
        if (!_.isEmpty(validation)) {
          validation.address = validate(
            'location',
            nextProps.route.params.data[1],
          );
        }
      }
    }
  }

  onChangeText = name => text => {
    const {validation} = this.state;
    this.setState({[name]: text});
    // real-time validation when data was submitted
    if (!_.isEmpty(validation)) {
      if (name === 'topic' || name === 'price') {
        validation[name] = validate('input', text);
      } else if (name === 'phone') {
        validation[name] = validate('phone', text);
      } else if (name === 'address') {
        validation[name] = validate('location', text);
      }
    }
  };

  onSelectOption = name => index => {
    const {typeData, goodsData, validation} = this.state;
    if (name === 'type') {
      this.setState({[name]: typeData[index.row]});
      typeData[index.row] === 'บริจาค'
        ? this.setState({price: '0'})
        : this.setState({price: ''});
      validation[name] = validate('selector', typeData[index.row]);
    } else if (name === 'goods') {
      this.setState({[name]: goodsData[index.row]});
      validation[name] = validate('selector', goodsData[index.row]);
    }
  };

  onSubmit = () => {
    const {topic, type, goods, price, phone, location, address} = this.state;
    var validation = {};
    validation.topic = validate('input', topic);
    validation.type = validate('selector', type);
    validation.goods = validate('selector', goods);
    validation.price = validate('input', price);
    validation.phone = validate('phone', phone);
    validation.address = validate(
      'location',
      location.lng && location.lat && address,
    );

    this.setState({validation: validation});
  };

  labelInput = text => {
    return <Text style={styles.label}>{text}</Text>;
  };

  renderInputStatus = name => {
    const {validation} = this.state;
    return validation[name] == null ? 'basic' : 'danger';
  };

  renderOption = (title, index) => (
    <SelectItem key={index} title={this.labelInput(title)} />
  );

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
      validation,
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
              <Text style={styles.header}>เพิ่มสินค้าใหม่ของคุณ</Text>
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={topic}
                name="topic"
                keyboardType="default"
                status={this.renderInputStatus('topic')}
                caption={validation.topic}
                label={this.labelInput('หัวข้อ *')}
                placeholder="ระบุตามที่ต้องการ"
                onChangeText={this.onChangeText('topic')}
              />
              <Select
                style={styles.inputform}
                value={type.length === 0 ? type : this.labelInput(type)}
                name="type"
                status={this.renderInputStatus('type')}
                caption={validation.type}
                label={this.labelInput('ประเภท *')}
                placeholder="เลือก"
                accessoryRight={ChevronIcon}
                onSelect={this.onSelectOption('type')}>
                {typeData.map(this.renderOption)}
              </Select>
              <Layout style={styles.row} level="3">
                <Select
                  style={styles.select}
                  value={goods.length === 0 ? goods : this.labelInput(goods)}
                  name="goods"
                  status={this.renderInputStatus('goods')}
                  caption={validation.goods}
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
                  disabled={type === 'บริจาค'}
                  keyboardType="default"
                  status={this.renderInputStatus('price')}
                  caption={validation.price}
                  label={this.labelInput('ราคา *')}
                  placeholder="30 - 80"
                  onChangeText={this.onChangeText('price')}
                />
              </Layout>
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={describe}
                name="describe"
                keyboardType="default"
                label={this.labelInput('รายละเอียดสินค้าเพิ่มเติม')}
                placeholder=""
                onChangeText={this.onChangeText('describe')}
              />
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={phone}
                name="phone"
                maxLength={10}
                keyboardType="phone-pad"
                status={this.renderInputStatus('phone')}
                caption={validation.phone}
                label={this.labelInput('เบอร์ติดต่อ *')}
                placeholder="0824686293"
                onChangeText={this.onChangeText('phone')}
              />
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={contact}
                name="contact"
                keyboardType="default"
                label={this.labelInput('ช่องทางการติดต่อเพิ่มเติม')}
                placeholder="เช่น Line, Facebook"
                onChangeText={this.onChangeText('contact')}
              />
              <Input
                style={styles.inputform}
                textStyle={styles.placeholder}
                value={address}
                name="address"
                keyboardType="default"
                status={this.renderInputStatus('address')}
                caption={validation.address}
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
              <Button
                style={styles.button}
                size="medium"
                status="primary"
                onPress={this.onSubmit}>
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
    marginTop: 18,
    marginBottom: 24,
    backgroundColor: '#2c3d70',
    borderColor: '#2c3d70',
  },
  label: {
    fontFamily: 'Sarabun-Medium',
    color: '#2c3d70',
  },
  placeholder: {
    fontFamily: 'Sarabun-Regular',
  },
  selectItem: {
    fontFamily: 'Sarabun-Regular',
    color: '#2c3d70',
  },
  header: {
    color: '#2c3d70',
    marginTop: 12,
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
  },
});
