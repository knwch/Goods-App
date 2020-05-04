import React from 'react';
import {Button, Modal, Card} from '@ui-kitten/components';
import {StyleSheet, Text} from 'react-native';

function Modalerrors({isErrors, closeErrorsModal, message}) {
  return (
    <Modal
      visible={isErrors}
      backdropStyle={styles.backdrop}
      onBackdropPress={closeErrorsModal}>
      <Card disabled={true}>
        <Text style={styles.modalLabel}>มีข้อผิดพลาด</Text>
        <Text style={styles.errorMessage}>{message.errors}</Text>
        <Button onPress={closeErrorsModal}>
          <Text style={styles.buttonText}>รับทราบ</Text>
        </Button>
      </Card>
    </Modal>
  );
}
export default Modalerrors;
const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalLabel: {
    fontFamily: 'Kanit-Regular',
    marginBottom: 8,
    color: '#2c3d70',
  },
  errorMessage: {
    fontFamily: 'Kanit-Regular',
    marginBottom: 8,
    color: '#FF0000',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Kanit-Regular',
  },
});
