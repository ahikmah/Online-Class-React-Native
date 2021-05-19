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
    height: Dimensions.get('window').height > 700 ? 250 : 100,
    width: Dimensions.get('window').height > 700 ? 170 : 70,
  });
  const [modalSize, setModalSize] = useState(
    Dimensions.get('window').height > 700 ? 0.7 : 1,
  );

  useEffect(() => {
    const updateLayout = () => {
      setIconModal({
        height: Dimensions.get('window').height > 700 ? 250 : 100,
        width: Dimensions.get('window').height > 700 ? 170 : 70,
      });
      setModalSize(Dimensions.get('window').height > 700 ? 0.7 : 1);
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
            {props.iconStyle === 'success' ? (
              <Image
                source={require('../assets/images/success-modal.png')}
                style={{height: iconModal.height, width: iconModal.width}}
              />
            ) : null}
            <Text style={styles.modalText}>{props.msg}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={props.onAction}>
              <Text style={styles.textStyle}>{props.btnLabel}</Text>
            </Pressable>
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
    justifyContent: 'space-around',
    // flex: Dimensions.get('window').height > 700 ? 0.7 : 1,
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  //   iconModal: {
  //     height: Dimensions.get('window').height > 700 ? 250 : 100,
  //     width: Dimensions.get('window').height > 700 ? 170 : 70,
  //   },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 50,
    color: '#5784BA',
  },
});

export default CustomModal;
