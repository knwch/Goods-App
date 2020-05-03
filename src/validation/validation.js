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

  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: '^กรุณายืนยันรหัสผ่าน',
    },
    equality: {
      attribute: 'password',
      message: '^รหัสผ่านไม่ตรงกัน',
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
  var formValues = {};
  formValues[fieldName] = value;

  if (fieldName === 'confirmPassword') {
    var passwordObject = {};
    Object.keys(formValues).map(function(k) {
      passwordObject = formValues[k];
    });
    formValues = passwordObject;
  }

  var formFields = {};
  formFields[fieldName] = validation[fieldName];

  const result = validatejs(formValues, formFields);

  if (result) {
    return result[fieldName][0];
  }
  return null;
}
