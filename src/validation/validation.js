const validatejs = require('./validate.min');

const validation = {
  email: {
    presence: {
      allowEmpty: false,
      message: '^กรุณากรอกอีเมล',
    },
    email: {
      message: '^อีเมลไม่ถูกต้อง',
    },
  },

  password: {
    presence: {
      allowEmpty: false,
      message: '^กรุณากรอกรหัสผ่าน',
    },
    length: {
      minimum: 6,
      maximum: 30,
      message: '^รหัสผ่านต้องมีความยาวระหว่าง 6 ถึง 30 ตัวอักษร',
    },
  },

  phone: {
    length: {
      minimum: 10,
      message: '^กรุณากรอกเบอร์ติดต่อ',
    },
    format: {pattern: '[0-9]+', message: '^เบอร์ติดต่อไม่ถูกต้อง'},
  },

  location: {
    presence: {
      allowEmpty: false,
      message: '^กรุณาปักหมุดสถานที่',
    },
  },

  selector: {
    presence: {
      allowEmpty: false,
      message: '^กรุณาเลือก',
    },
  },

  input: {
    presence: {
      allowEmpty: false,
      message: '^กรุณากรอกข้อมูล',
    },
  },
};

export default function validate(fieldName, value) {
  // Validate.js validates your values as an object
  // e.g. var form = {email: ‘email@example.com’}
  // Line 8–9 creates an object based on the field name and field value
  var formValues = {};
  formValues[fieldName] = value;
  // Line 13–14 creates an temporary form with the validation fields
  // e.g. var formFields = {
  // email: {
  // presence: {
  // message: ‘Email is blank’
  // }
  // }
  var formFields = {};
  formFields[fieldName] = validation[fieldName];
  // The formValues and validated against the formFields
  // the variable result hold the error messages of the field
  const result = validatejs(formValues, formFields);
  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[fieldName][0];
  }
  return null;
}
