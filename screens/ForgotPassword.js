/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
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
} from 'react-native';
import {Form, Item, Input, Label, Button, Icon} from 'native-base';
import {sendOTP} from '../redux/Action/auth';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';

function ForgotPassword({...props}) {
  const [email, setEmail] = useState('');
  const [inputValidation, setInputValidation] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const errorStyle = {
    borderColor: '#EB4335',
    color: '#EB4335',
  };
  const [zIndexInput, setZIndexInput] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);

  const [componentWidth, setComponentWidth] = useState(
    Dimensions.get('window').width - 64,
  );
  useEffect(() => {
    if (inputValidation) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValidation]);
  useEffect(() => {
    const updateLayout = () => {
      setComponentWidth(Dimensions.get('window').width - 64);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });
  const sendOTPHandler = e => {
    e.preventDefault();
    props.sendOTP(`${DOMAIN_API}:${PORT_API}/data/auth/send-otp`, {
      email: email,
    });
  };

  // e-mails must be in the format x@x.x
  const isValidEmailAddress = address => {
    return !!address.match(/^[^\s@]+@[^\s@.]+\.[^\s@]+$/);
  };
  const emailValidation = () => {
    if (email === '') {
      setInputValidation(false);
      setErrorMessage("This field can't be empty");
    } else if (!isValidEmailAddress(email)) {
      setInputValidation(false);
      setErrorMessage('Please enter a valid email');
    } else {
      setInputValidation(true);
    }
  };

  // console.log(email);
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
    } else {
      if (props.auth.isOtpPending) {
        console.log('Loading...');
      } else if (props.auth.isOtpFulfilled) {
        console.log('sukses');
        props.navigation.navigate('CodeVerification');
      } else if (props.auth.isOtpRejected) {
        setInputValidation(false);
        if (props.auth.errorOtp.response.data.error.status === 401) {
          setErrorMessage('This email is not registered');
        } else {
          setErrorMessage('Something wrong..');
        }
        // console.log('failed', {...props.auth.errorOtp.response.data});
      }
    }
  }, [
    props.auth.isOtpPending,
    props.auth.isOtpFulfilled,
    props.auth.isOtpRejected,
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
          <View style={styles.header}>
            <Icon
              name="chevron-back"
              onPress={() => props.navigation.goBack()}
            />
          </View>
          <View style={styles.main}>
            <Text style={styles.title}>Reset Password</Text>
            <Image source={require('../assets/images/ava-reset1.png')} />
            <Text style={styles.msg1}>
              Enter your email address linked to this account
            </Text>
            <Text style={styles.msg2}>
              We will send you the verification code to reset your password
            </Text>

            <KeyboardAvoidingView
              style={{width: componentWidth}}
              keyboardVerticalOffset={-50}>
              <Form>
                <Item floatingLabel style={styles.formItem}>
                  <Label
                    style={{
                      ...styles.formLabel,
                      color:
                        inputValidation === false
                          ? errorStyle.color
                          : '#ADA9BB',
                    }}>
                    Email
                  </Label>
                  <Input
                    style={{
                      ...styles.formInput,
                      zIndex: zIndexInput,
                      borderColor:
                        inputValidation === false
                          ? errorStyle.borderColor
                          : '#ADA9BB',
                    }}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    onPressIn={() => {
                      setZIndexInput(-1);

                      setInputValidation();
                      setErrorMessage('');
                    }}
                    onBlur={() => {
                      setZIndexInput(email ? -1 : 1);
                      emailValidation();
                    }}
                    disableFullscreenUI={true}
                    keyboardType="email-address"
                  />
                </Item>
                <Text
                  style={{
                    ...styles.errorMessage,
                    marginBottom: errorMessage ? 5 : -5,
                  }}>
                  {errorMessage}
                </Text>
              </Form>
              <Button
                style={{
                  ...styles.btnSend,
                  width: componentWidth,
                  opacity: isDisabled ? 0.7 : 1,
                }}
                disabled={isDisabled}
                onPress={sendOTPHandler}>
                <Text style={styles.buttonLabel}> Send </Text>
              </Button>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
    // paddingTop: StatusBar.currentHeight,
    // height:
    //   Dimensions.get('window').height < 700
    //     ? StatusBar.currentHeight + 700
    //     : StatusBar.currentHeight + Dimensions.get('window').height,
    height: Dimensions.get('window').height + StatusBar.currentHeight,

    justifyContent: 'space-around',
    paddingHorizontal: 32,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  header: {
    position: 'absolute',
    paddingTop: 9,
    top: 40,
    left: 32,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 32,
    paddingTop: 32,
    fontFamily: 'Kanit-Medium',
  },
  msg1: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    textAlign: 'center',
    // marginVertical: 16,
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
    // marginBottom: 20,
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
  btnSend: {
    width: Dimensions.get('window').width - 64,
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#5784BA',
    height: 50,
    marginBottom: 50,
  },

  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
  errorMessage: {
    paddingLeft: 5,
    marginTop: 10,
    color: '#EB4335',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  sendOTP: (url, data) => {
    dispatch(sendOTP(url, data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
