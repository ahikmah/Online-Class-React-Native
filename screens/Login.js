/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Form, Item, Input, Label, Button, Icon} from 'native-base';
import {SimpleAnimation} from 'react-native-simple-animations';
import {login} from '../redux/Action/auth';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';

function Login({...props}) {
  const [dataLogin, setDataLogin] = useState({username: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const [zIndexInput, setZIndexInput] = useState({
    username: 1,
    password: 1,
  });
  const [inputValidation, setInputValidation] = useState({
    username: undefined,
    password: undefined,
  });

  // console.log(props.auth);
  const [isDisabled, setIsDisabled] = useState(true);

  const [componentWidth, setComponentWidth] = useState(
    Dimensions.get('window').width - 64,
  );
  const [marginTop, setMarginTop] = useState(
    Dimensions.get('window').height > 700
      ? StatusBar.currentHeight + 64
      : StatusBar.currentHeight + 16,
  );
  const [marginBottom, setMarginBottom] = useState(
    Dimensions.get('window').height > 700 ? StatusBar.currentHeight + 64 : null,
  );

  // console.log({...props});

  useEffect(() => {
    const updateLayout = () => {
      setComponentWidth(Dimensions.get('window').width - 64);
      setMarginTop(
        Dimensions.get('window').height > 700
          ? StatusBar.currentHeight + 64
          : StatusBar.currentHeight + 16,
      );
      setMarginBottom(
        Dimensions.get('window').height > 700
          ? StatusBar.currentHeight + 64
          : null,
      );
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  // =============================VALIDATION SECTION============================= //
  // e-mails must be in the format x@x.x
  const isValidEmailAddress = address => {
    return !!address.match(/^[^\s@]+@[^\s@.]+\.[^\s@]+$/);
  };
  // username : min. length = 5
  const usernameValidation = () => {
    if (dataLogin.username === '') {
      setInputValidation({...inputValidation, username: false});
    } else if (dataLogin.username.length < 4) {
      setInputValidation({...inputValidation, username: false});
    } else if (dataLogin.username.includes('@')) {
      if (!isValidEmailAddress(dataLogin.username)) {
        setInputValidation({...inputValidation, username: false});
      } else {
        setInputValidation({...inputValidation, username: true});
      }
    } else {
      setInputValidation({...inputValidation, username: true});
    }
  };

  // password : min. length = 8
  const passwordValidation = () => {
    if (dataLogin.password === '') {
      setInputValidation({...inputValidation, password: false});
    } else if (dataLogin.password.length < 5) {
      setInputValidation({...inputValidation, password: false});
    } else {
      setInputValidation({...inputValidation, password: true});
    }
  };

  // =============================END VALIDATION SECTION============================= //

  useEffect(() => {
    if (inputValidation.username && inputValidation.password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValidation]);

  const loginHandler = e => {
    e.preventDefault();
    props.login(`${DOMAIN_API}:${PORT_API}/data/auth/login`, dataLogin);
  };

  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
    } else {
      if (props.auth.isLoginPending) {
        console.log('Loading...');
        setIndicatorVisible(true);
      } else if (props.auth.isLoginFulfilled) {
        console.log('sukses');
        setIndicatorVisible(false);
      } else if (props.auth.isLoginRejected) {
        setIndicatorVisible(false);
        console.log({...props.auth.errorLogin});
        if (
          props.auth.errorLogin.response &&
          props.auth.errorLogin.response.status === 401
        ) {
          setErrorMessage(
            'The username and password you entered did not match our records. Please double-check and try again.',
          );
          setErrorMessageVisible(true);
        } else {
          setErrorMessage(
            'Opps.. Sorry, our server seems to be having trouble',
          );
          setErrorMessageVisible(true);
        }
      }
    }
  }, [
    props.auth.isLoginPending,
    props.auth.isLoginFulfilled,
    props.auth.isLoginRejected,
  ]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#F9F9F9"
        barStyle="dark-content"
      />
      <ScrollView>
        <View style={styles.container}>
          {indicatorVisible ? (
            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                position: 'absolute',
                // top: '50%',
                backgroundColor: 'white',
                opacity: 0.6,
                zIndex: 10,
                width: '100%',
                height: '100%',
              }}>
              <ActivityIndicator size={64} color="#5784BA" />
            </View>
          ) : null}

          <KeyboardAvoidingView
            // behavior="padding"
            style={{width: componentWidth}}>
            <Text
              style={{
                ...styles.title,
                marginTop: marginTop,
                marginBottom: marginBottom,
              }}>
              Login
            </Text>
            {errorMessageVisible ? (
              <SimpleAnimation delay={500} duration={1000} staticType="bounce">
                <View style={styles.errorMessage}>
                  <Icon
                    name="close"
                    style={{color: 'white'}}
                    onPress={() => setErrorMessageVisible(false)}
                  />
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              </SimpleAnimation>
            ) : null}

            <Form>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Username or Email</Label>
                <Input
                  style={{...styles.formInput, zIndex: zIndexInput.username}}
                  value={dataLogin.username}
                  onChangeText={text =>
                    setDataLogin({...dataLogin, username: text})
                  }
                  onPressIn={() => {
                    setZIndexInput({...zIndexInput, username: -1});
                    setInputValidation({
                      ...inputValidation,
                      username: undefined,
                    });
                    setErrorMessageVisible(false);
                  }}
                  onBlur={() => {
                    setZIndexInput({
                      ...zIndexInput,
                      username: dataLogin.username ? -1 : 1,
                    });

                    usernameValidation();
                  }}
                  disableFullscreenUI={true}
                  // keyboardType="email-address"
                />
              </Item>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Password</Label>
                <Input
                  secureTextEntry={!showPassword ? true : false}
                  keyboardType={showPassword ? 'visible-password' : null}
                  style={{...styles.formInput, zIndex: zIndexInput.password}}
                  value={dataLogin.password}
                  onChangeText={text =>
                    setDataLogin({...dataLogin, password: text})
                  }
                  onPressIn={() => {
                    setZIndexInput({...zIndexInput, password: -1});
                    setInputValidation({
                      ...inputValidation,
                      password: undefined,
                    });
                    setErrorMessageVisible(false);
                  }}
                  onBlur={() => {
                    setZIndexInput({
                      ...zIndexInput,
                      password: dataLogin.password ? -1 : 1,
                    });

                    passwordValidation();
                  }}
                  disableFullscreenUI={true}
                />
                <Icon
                  name={!showPassword ? 'eye' : 'eye-off'}
                  style={styles.eyeToggler}
                  onPress={() => setShowPassword(!showPassword)}
                />
              </Item>
            </Form>

            <Text
              style={styles.txtForgot}
              onPress={() => props.navigation.navigate('ForgotPassword')}>
              Forgot password?
            </Text>
            <KeyboardAvoidingView style={styles.btnGroup}>
              <Button
                style={{
                  ...styles.buttonLogin,
                  width: componentWidth,
                  opacity: isDisabled ? 0.7 : 1,
                }}
                onPress={loginHandler}
                disabled={isDisabled}>
                <Text style={styles.buttonLabel}> Login </Text>
              </Button>
              <Button style={{...styles.buttonGoogle, width: componentWidth}}>
                <Image source={require('../assets/images/google-icon.png')} />
                <Text style={styles.buttonLabelGoogle}>
                  {' '}
                  Login with Google{' '}
                </Text>
              </Button>
            </KeyboardAvoidingView>
          </KeyboardAvoidingView>

          <View style={styles.txtFooter}>
            <Text style={styles.txtNewUser}>New user?</Text>
            <Text
              style={styles.txtRegister}
              onPress={() => props.navigation.navigate('Register')}>
              Register
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    // paddingTop: ,
    height:
      Dimensions.get('window').height < 700
        ? StatusBar.currentHeight + 700
        : StatusBar.currentHeight + Dimensions.get('window').height,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#F9F9F9',
    // flex: 1,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Kanit-Medium',
    textAlign: 'center',
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
    marginBottom: 20,
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
  eyeToggler: {
    position: 'absolute',
    right: 10,
    top: 17,
    marginLeft: 12,
  },
  txtForgot: {
    marginTop: 12,
    textAlign: 'right',
    fontFamily: 'Roboto-Medium',
  },

  btnGroup: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonLogin: {
    justifyContent: 'center',
    marginTop: 60,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#5784BA',
    height: 50,
  },

  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
  buttonGoogle: {
    justifyContent: 'center',
    marginTop: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    height: 50,
  },

  buttonLabelGoogle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
    marginLeft: 12,
  },
  txtFooter: {
    flexDirection: 'row',
  },
  txtNewUser: {color: '#ADA9BB', fontFamily: 'Kanit-Medium', fontSize: 15},
  txtRegister: {
    fontFamily: 'Kanit-Medium',
    marginLeft: 5,
    color: '#5784BA',
    fontSize: 16,
  },

  errorMessage: {
    backgroundColor: '#EB4335',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  errorText: {
    color: '#F9F9F9',
    padding: 10,
    paddingLeft: 15,
    // paddingHorizontal: 15,
    // textAlign: 'center',
    width: '90%',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  login: (url, data) => {
    dispatch(login(url, data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
