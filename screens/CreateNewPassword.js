/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import {Form, Item, Input, Label, Button, Icon} from 'native-base';
import PasswordChanged from '../components/PasswordChanged';

import axios from 'axios';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';

function CreateNewPassword({...props}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [dataReset, setDataReset] = useState({
    password: '',
    repassword: '',
  });

  const errorStyle = {
    borderColor: '#EB4335',
    color: '#EB4335',
  };
  const [errorMessage, setErrorMessage] = useState({
    password: '',
    repassword: '',
  });
  const [inputValidation, setInputValidation] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    repassword: undefined,
  });

  const [zIndexInput, setZIndexInput] = useState({
    password: 1,
    repassword: 1,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const [componentWidth, setComponentWidth] = useState(
    Dimensions.get('window').width - 64,
  );

  useEffect(() => {
    const updateLayout = () => {
      setComponentWidth(Dimensions.get('window').width - 64);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  // password : min. length = 8
  const passwordValidation = () => {
    if (dataReset.password === '') {
      setInputValidation({...inputValidation, password: false});
      setErrorMessage({...errorMessage, password: "This field can't be empty"});
    } else if (dataReset.password.length < 8) {
      setInputValidation({...inputValidation, password: false});
      setErrorMessage({
        ...errorMessage,
        password: 'Password must be at least 8 characters',
      });
    } else {
      setInputValidation({...inputValidation, password: true});
    }
  };
  //re-password: must be the same as the previous one
  const rePasswordValidation = () => {
    if (dataReset.repassword === '') {
      setInputValidation({...inputValidation, repassword: false});
      setErrorMessage({
        ...errorMessage,
        repassword: "This field can't be empty",
      });
    } else if (dataReset.repassword.length < 8) {
      setInputValidation({...inputValidation, repassword: false});
      setErrorMessage({
        ...errorMessage,
        repassword: 'Password must be at least 8 characters',
      });
    } else if (dataReset.repassword !== dataReset.password) {
      setInputValidation({...inputValidation, repassword: false});
      setErrorMessage({
        ...errorMessage,
        repassword: "Password don't match",
      });
    } else {
      setInputValidation({...inputValidation, repassword: true});
      setErrorMessage({
        ...errorMessage,
        repassword: 'Password  match',
      });
    }
  };
  useEffect(() => {
    if (inputValidation.password && inputValidation.repassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValidation]);
  const resetHandler = e => {
    e.preventDefault();
    axios
      .patch(`${DOMAIN_API}:${PORT_API}/data/auth/reset-password`, {
        otp: props.otp,
        password: dataReset.password,
      })
      .then(res => {
        console.log('sukses');
        setModalShow(true);
      })
      .catch(err => console.log('failed', err));
  };
  // console.log('heio', props.auth);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Create New Password</Text>

          <Text style={styles.msg2}>
            Your new password must be different from previous used password!
          </Text>

          <KeyboardAvoidingView behavior="padding">
            <Form>
              <Item floatingLabel style={styles.formItem}>
                <Label
                  style={{
                    ...styles.formLabel,
                    color:
                      inputValidation.password === false
                        ? errorStyle.color
                        : '#ADA9BB',
                  }}>
                  Password
                </Label>
                <Input
                  secureTextEntry={!showPassword ? true : false}
                  style={{
                    ...styles.formInput,
                    paddingRight: 45,
                    zIndex: zIndexInput.password,
                    borderColor:
                      inputValidation.password === false
                        ? errorStyle.borderColor
                        : '#ADA9BB',
                  }}
                  value={dataReset.password}
                  onChangeText={text => {
                    setDataReset({...dataReset, password: text});
                  }}
                  onPressIn={() => {
                    setZIndexInput({...zIndexInput, password: -1});

                    setInputValidation({
                      ...inputValidation,
                      password: undefined,
                    });
                    setErrorMessage({...errorMessage, password: ''});
                  }}
                  onBlur={() => {
                    setZIndexInput({
                      ...zIndexInput,
                      password: dataReset.password ? -1 : 1,
                    });

                    passwordValidation();
                  }}
                  keyboardType={showPassword ? 'visible-password' : null}
                  disableFullscreenUI={true}
                />
                <Icon
                  name={!showPassword ? 'eye' : 'eye-off'}
                  style={styles.eyeToggler}
                  onPress={() => setShowPassword(!showPassword)}
                />
              </Item>
              <Text
                style={{
                  ...styles.errorMessage,
                  marginBottom: errorMessage.password ? 5 : -5,
                }}>
                {errorMessage.password}
              </Text>

              <Item floatingLabel style={styles.formItem}>
                <Label
                  style={{
                    ...styles.formLabel,
                    color:
                      inputValidation.repassword === false
                        ? errorStyle.color
                        : '#ADA9BB',
                  }}>
                  Confirm Password
                </Label>
                <Input
                  secureTextEntry={!showConfirmPassword ? true : false}
                  style={{
                    ...styles.formInput,
                    paddingRight: 45,
                    zIndex: zIndexInput.repassword,
                    borderColor:
                      inputValidation.repassword === false
                        ? errorStyle.borderColor
                        : '#ADA9BB',
                  }}
                  value={dataReset.repassword}
                  onChangeText={text => {
                    setDataReset({...dataReset, repassword: text});
                  }}
                  onPressIn={() => {
                    setZIndexInput({...zIndexInput, repassword: -1});
                    setInputValidation({
                      ...inputValidation,
                      repassword: undefined,
                    });
                    setErrorMessage({...errorMessage, repassword: ''});
                  }}
                  onBlur={() => {
                    setZIndexInput({
                      ...zIndexInput,
                      repassword: dataReset.repassword ? -1 : 1,
                    });
                    rePasswordValidation();
                  }}
                  keyboardType={showConfirmPassword ? 'visible-password' : null}
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
                    inputValidation.repassword === true
                      ? '#0EAA00'
                      : errorStyle.color,
                  marginBottom: errorMessage.password ? 5 : -5,
                }}>
                {errorMessage.repassword}
                {inputValidation.repassword === true ? (
                  <Icon
                    name="checkmark-circle"
                    style={{fontSize: 14, color: '#0EAA00'}}
                  />
                ) : null}
              </Text>
            </Form>
            <Button
              style={{
                ...styles.buttonLogin,
                width: componentWidth,
                opacity: isDisabled ? 0.7 : 1,
              }}
              disabled={isDisabled}
              onPress={resetHandler}>
              <Text style={styles.buttonLabel}>Create</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </View>
      {modalShow && (
        <PasswordChanged onNext={() => props.navigation.navigate('Login')} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height:
      Dimensions.get('window').height < 700
        ? StatusBar.currentHeight + 700
        : StatusBar.currentHeight + Dimensions.get('window').height,
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Kanit-Medium',
  },
  msg1: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  msg2: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#837F8F',
  },
  formInput: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ADA9BB',
    borderRadius: 10,
    paddingLeft: 16,
    fontFamily: 'Roboto-Regular',
    color: '#010620',
    height: 55,
    paddingRight: 16,
  },
  formItem: {
    marginTop: 0,
    borderBottomWidth: 0,
    marginLeft: 0,
  },
  formLabel: {
    backgroundColor: '#F9F9F9',
    marginLeft: 16,
    fontFamily: 'Kanit-Regular',
    // color: '#ADA9BB',
    fontSize: 16,
    position: 'absolute',
  },
  buttonLogin: {
    width: Dimensions.get('window').width - 64,
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#5784BA',
    height: 50,
    marginBottom: 100,
  },

  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
  eyeToggler: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  errorMessage: {
    paddingLeft: 5,
    marginTop: 10,
    color: '#EB4335',
  },
});
const mapStateToProps = state => ({
  otp: state.auth.codeOTP,
});

export default connect(mapStateToProps)(CreateNewPassword);
