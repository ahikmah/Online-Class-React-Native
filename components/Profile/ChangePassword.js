/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {Icon, Input, Item, Label, Form} from 'native-base';
import CustomModal from '../../components/CustomModal';

import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {getDataUser} from '../../redux/Action/auth';
import {connect} from 'react-redux';

function ChangePassword({...props}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  // const [isDisabled, setIsDisabled] = useState({
  //   save: true,
  // });

  const errorStyle = {
    borderColor: '#EB4335',
    color: '#EB4335',
  };
  const [errorMessage, setErrorMessage] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [inputValidation, setInputValidation] = useState({
    oldPassword: undefined,
    newPassword: undefined,
    confirmPassword: undefined,
  });

  // =============================VALIDATION SECTION============================= //
  // oldPassword : min. length = 8
  const oldPasswordValidation = () => {
    if (oldPassword === '') {
      setInputValidation({...inputValidation, oldPassword: false});
      setErrorMessage({
        ...errorMessage,
        oldPassword: "This field can't be empty",
      });
    } else {
      setInputValidation({...inputValidation, oldPassword: true});
    }
  };
  // newPassword : min. length = 8
  const newPasswordValidation = () => {
    if (newPassword === '') {
      setInputValidation({...inputValidation, newPassword: false});
      setErrorMessage({
        ...errorMessage,
        newPassword: "This field can't be empty",
      });
    } else if (newPassword.length < 8) {
      setInputValidation({...inputValidation, newPassword: false});
      setErrorMessage({
        ...errorMessage,
        newPassword: 'Password must be at least 8 characters',
      });
    } else {
      setInputValidation({...inputValidation, newPassword: true});
    }
  };
  //re-newPassword: must be the same as the previous one
  const confirmPasswordValidation = () => {
    if (confirmPassword === '') {
      setInputValidation({...inputValidation, confirmPassword: false});
      setErrorMessage({
        ...errorMessage,
        confirmPassword: "This field can't be empty",
      });
    } else if (confirmPassword.length < 8) {
      setInputValidation({...inputValidation, confirmPassword: false});
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Password must be at least 8 characters',
      });
    } else if (confirmPassword !== newPassword) {
      setInputValidation({...inputValidation, confirmPassword: false});
      setErrorMessage({
        ...errorMessage,
        confirmPassword: "Password doesn't match",
      });
    } else {
      setInputValidation({...inputValidation, confirmPassword: true});
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Password match',
      });
    }
  };
  // =============================END VALIDATION SECTION============================= //
  const updateHandler = e => {
    e.preventDefault();
    const data = {
      id: props.id,
      oldPassword: oldPassword,
      password: newPassword,
    };
    axios
      .patch(`${DOMAIN_API}:${PORT_API}/data/auth/reset-password`, data)
      .then(res => {
        setModalVisible(false);
        setSuccessModalVisible(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage({
          ...errorMessage,
          confirmPassword: '',
        });
        setInputValidation({
          oldPassword: undefined,
          newPassword: undefined,
          confirmPassword: undefined,
        });
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.error.message.includes('wrong')) {
          // console.log('username is already taken');
          setInputValidation({...inputValidation, oldPassword: false});
          setErrorMessage({
            ...errorMessage,
            oldPassword: "Your password doesn't match with our database",
          });
          setModalVisible(false);
        }
      });
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topSection}>
            <View style={styles.leftSection}>
              <Icon
                name="chevron-back"
                style={{color: 'white', fontSize: 24}}
                onPress={() => props.navigation.goBack()}
              />
              <Text
                style={styles.title}
                onPress={() => props.navigation.goBack()}>
                Change Password
              </Text>
            </View>
            <Text
              style={{
                ...styles.action,
                color:
                  inputValidation.oldPassword &&
                  inputValidation.newPassword &&
                  inputValidation.confirmPassword
                    ? 'white'
                    : '#ADA9BB',
              }}
              onPress={
                inputValidation.oldPassword &&
                inputValidation.newPassword &&
                inputValidation.confirmPassword
                  ? () => setModalVisible(true)
                  : null
              }>
              Save
            </Text>
          </View>
        </View>

        <ScrollView style={styles.mainSection}>
          <Form>
            <Item
              stackedLabel
              style={{
                ...styles.formItem,
                borderBottomColor:
                  inputValidation.oldPassword === false
                    ? errorStyle.borderColor
                    : null,
              }}>
              <Label
                style={
                  inputValidation.oldPassword === false
                    ? {
                        color: errorStyle.color,
                      }
                    : null
                }>
                Old Password
              </Label>
              <Input
                secureTextEntry={!showOldPassword ? true : false}
                keyboardType={showOldPassword ? 'visible-password' : null}
                style={styles.active}
                value={oldPassword}
                onChangeText={text => setOldPassword(text)}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, oldPassword: ''});
                  setInputValidation({
                    ...inputValidation,
                    oldPassword: undefined,
                  });
                }}
                onBlur={() => {
                  oldPasswordValidation();
                }}
                disableFullscreenUI={true}
              />
              <Icon
                name={!showOldPassword ? 'eye' : 'eye-off'}
                style={styles.eyeToggler}
                onPress={() => setShowOldPassword(!showOldPassword)}
              />
              <Icon
                name={!showOldPassword ? 'eye' : 'eye-off'}
                style={styles.eyeToggler}
                onPress={() => setShowOldPassword(!showOldPassword)}
              />
            </Item>
            <Text style={{...styles.errorMessage, color: errorStyle.color}}>
              {errorMessage.oldPassword}
            </Text>

            <Item
              stackedLabel
              style={{
                ...styles.formItem,
                borderBottomColor:
                  inputValidation.newPassword === false
                    ? errorStyle.borderColor
                    : null,
              }}>
              <Label
                style={
                  inputValidation.newPassword === false
                    ? {
                        color: errorStyle.color,
                      }
                    : null
                }>
                New Password
              </Label>
              <Input
                secureTextEntry={!showNewPassword ? true : false}
                keyboardType={showNewPassword ? 'visible-password' : null}
                style={styles.active}
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, newPassword: ''});
                  setInputValidation({
                    ...inputValidation,
                    newPassword: undefined,
                  });
                }}
                onBlur={() => {
                  newPasswordValidation();
                }}
                disableFullscreenUI={true}
              />
              <Icon
                name={!showNewPassword ? 'eye' : 'eye-off'}
                style={styles.eyeToggler}
                onPress={() => setShowNewPassword(!showNewPassword)}
              />
            </Item>
            <Text style={{...styles.errorMessage, color: errorStyle.color}}>
              {errorMessage.newPassword}
            </Text>

            <Item
              stackedLabel
              style={{
                ...styles.formItem,
                borderBottomColor:
                  inputValidation.confirmPassword === false
                    ? errorStyle.borderColor
                    : null,
              }}>
              <Label
                style={
                  inputValidation.confirmPassword === false
                    ? {
                        color: errorStyle.color,
                      }
                    : null
                }>
                Confirm New Password
              </Label>
              <Input
                secureTextEntry={!showConfirmPassword ? true : false}
                keyboardType={showConfirmPassword ? 'visible-password' : null}
                style={styles.active}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, confirmPassword: ''});
                  setInputValidation({
                    ...inputValidation,
                    confirmPassword: undefined,
                  });
                }}
                onBlur={() => {
                  confirmPasswordValidation();
                }}
                disableFullscreenUI={true}
              />
              <Icon
                name={!showConfirmPassword ? 'eye' : 'eye-off'}
                style={styles.eyeToggler}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </Item>
            <Text
              style={{
                ...styles.errorMessage,
                color:
                  inputValidation.confirmPassword === true
                    ? '#0EAA00'
                    : errorStyle.color,
              }}>
              {errorMessage.confirmPassword}
              {inputValidation.confirmPassword === true ? (
                <Icon
                  name="checkmark-circle"
                  style={{fontSize: 14, color: '#0EAA00'}}
                />
              ) : null}
            </Text>
          </Form>

          {modalVisible ? (
            <CustomModal
              iconStyle="confirm"
              modalVisible={modalVisible}
              title="Confirmation"
              msg="Are you sure want to save this change?"
              btnLabel3="Discard Change"
              onAction3={() => {
                setModalVisible(false);
              }}
              btnLabel4="Save Change"
              onAction4={updateHandler}
            />
          ) : null}
          {successModalVisible ? (
            <CustomModal
              iconStyle="success"
              modalVisible={successModalVisible}
              title="Yeay"
              msg="Your changes have been saved successfully!"
              btnLabel="Okay"
              onAction={() => setSuccessModalVisible(false)}
            />
          ) : null}
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  header: {
    paddingTop: StatusBar.currentHeight + 12 + (40 - StatusBar.currentHeight),
    backgroundColor: '#5784BA',
    paddingHorizontal: 26,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 24,
    zIndex: 2,
    marginBottom: 15,
  },
  //   mainSection: {paddingLeft: 5, paddingRight: 20},
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    color: 'white',
  },
  action: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
  },
  formItem: {marginBottom: 15},

  disable: {
    color: '#ADA9BB',
  },
  active: {
    color: '#000',
    paddingRight: 40,
  },
  set: {
    position: 'absolute',
    right: 30,
    top: 40,
  },
  forbidden: {
    marginTop: -15,
    paddingLeft: 20,
    color: 'red',
    fontSize: 12,
  },
  errorMessage: {
    marginTop: -15,
    paddingLeft: 20,
    // color: 'red',
    fontSize: 12,
  },
  eyeToggler: {
    position: 'absolute',
    right: 10,
    top: 0,
    marginLeft: 12,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  id: state.auth.currentUser.id,
  token: state.auth.resultLogin.token,
});
const mapDispatchToProps = dispatch => ({
  getDataUser: (url, token) => {
    dispatch(getDataUser(url, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
