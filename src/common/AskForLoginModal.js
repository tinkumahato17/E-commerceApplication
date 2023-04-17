import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const AskForLoginModal = ({ modalVisible, onClickLogin, onClickSignup, onClose }) => {
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              onClickLogin();
            }}
          >
            <Text style={styles.btnText}>{'Log in'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { marginTop: 35 }]}
            onPress={() => {
              onClickSignup();
            }}
          >
            <Text style={styles.btnText}>{'Create Account'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              onClose();
            }}>
            <Image source={require('../images/close.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AskForLoginModal;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    height: 200,
  },
  btn: {
    backgroundColor: '#63368A',
    width: '86%',
    height: 50,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  icon: {
    width: 20,
    height: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})