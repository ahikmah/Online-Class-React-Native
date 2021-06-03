/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
} from 'react-native';

const CustomModal = props => {
  const [iconModal, setIconModal] = useState({
    height: Dimensions.get('window').height > 650 ? 200 : 100,
    width: Dimensions.get('window').height > 650 ? 140 : 80,
  });
  const [modalSize, setModalSize] = useState(
    Dimensions.get('window').height > 650 ? 0.7 : 1,
  );

  useEffect(() => {
    const updateLayout = () => {
      setIconModal({
        height: Dimensions.get('window').height > 650 ? 200 : 100,
        width: Dimensions.get('window').height > 650 ? 130 : 80,
      });
      setModalSize(Dimensions.get('window').height > 650 ? 0.7 : 1);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        fullscreen={true}
        transparent={true}
        visible={props.modalVisible}>
        <View
          style={{
            ...styles.centeredView,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={{...styles.modalView, flex: modalSize}}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={{alignItems: 'center'}}>
              {props.iconStyle === 'success' ? (
                <Image
                  source={require('../assets/images/success-modal.png')}
                  style={{height: iconModal.height, width: iconModal.width}}
                />
              ) : props.iconStyle === 'confirm' ? (
                <Image
                  source={require('../assets/images/confirm-modal.png')}
                  style={{height: iconModal.height, width: iconModal.width}}
                />
              ) : props.iconStyle === 'confirm-danger' ? (
                <Image
                  source={require('../assets/images/fail-modal.png')}
                  style={{
                    height: iconModal.height,
                    width: iconModal.width,
                    left: 15,
                  }}
                />
              ) : null}
              <View style={{alignItems: 'center'}}>
                {props.msg ? (
                  <Text style={styles.modalText}>{props.msg}</Text>
                ) : props.content ? (
                  <Image style={styles.avatar} source={props.content} />
                ) : null}
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              {props.btnLabel ? (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={props.onAction}>
                  <Text style={styles.textStyle}>{props.btnLabel}</Text>
                </Pressable>
              ) : null}
              {props.btnLabel2 ? (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={props.onAction2}>
                  <Text style={styles.textStyle}>{props.btnLabel2}</Text>
                </Pressable>
              ) : null}
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              {props.btnLabel3 ? (
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={props.onAction3}>
                  <Text style={styles.textStyle}>{props.btnLabel3}</Text>
                </Pressable>
              ) : null}
              {props.btnLabel4 ? (
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={props.onAction4}>
                  <Text style={styles.textStyle}>{props.btnLabel4}</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    justifyContent: 'space-between',
    // alignItems: 'stretch',
    // flex: Dimensions.get('window').height > 650 ? 0.7 : 1,
    width: '85%',
    // marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#5784BA',
  },
  buttonSave: {
    backgroundColor: '#57BA61',
  },
  buttonCancel: {
    backgroundColor: '#EB4335',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  avatar: {
    width: 200,
    height: 200,
  },
  modalText: {
    fontFamily: 'Montserrat-Regular',
    marginVertical: 16,
    textAlign: 'center',
    fontSize: 15,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    marginBottom: 16,
    textAlign: 'center',
    color: '#5784BA',
  },
});

export default CustomModal;
