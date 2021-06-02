/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  TextInput,
  BackHandler,
} from 'react-native';
import {Button, Root, Toast} from 'native-base';
import axios from 'axios';
import {sendOTP, codeOTP} from '../redux/Action/auth';

import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';
import {useFocusEffect} from '@react-navigation/native';

function CodeVerification({...props}) {
  const [numOne, setNumOne] = useState('');
  const [numTwo, setNumTwo] = useState('');
  const [numThree, setNumThree] = useState('');
  const [numFour, setNumFour] = useState('');
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const [isDisabled, setIsDisabled] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    if (numOne && numTwo && numThree && numFour) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [numOne, numTwo, numThree, numFour]);
  const sendOTPHandler = e => {
    const email = props.msg;
    function extractEmails(text) {
      return text.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
      )[0];
    }
    e.preventDefault();
    props.sendOTP(`${DOMAIN_API}:${PORT_API}/data/auth/send-otp`, {
      email: extractEmails(email),
    });
  };

  const reff = useRef();
  useEffect(() => {
    if (!reff.current) {
      reff.current = true;
    } else {
      if (props.auth.isOtpPending) {
        console.log('Loading...');
      } else if (props.auth.isOtpFulfilled) {
        console.log('sukses');
        Toast.show({
          text: 'We have sent an OTP to your email',
          buttonText: 'Okay',
          type: 'success',
        });
      } else if (props.auth.isOtpRejected) {
        console.log('failed', {...props.auth.errorOtp.response.data});
      }
    }
  }, [
    props.auth.isOtpPending,
    props.auth.isOtpFulfilled,
    props.auth.isOtpRejected,
  ]);

  const verificationHandler = e => {
    e.preventDefault();
    axios
      .post(`${DOMAIN_API}:${PORT_API}/data/auth/verify-otp`, {
        id: props.idUser,
        otp: [numOne, numTwo, numThree, numFour].join(''),
      })
      .then(res => {
        console.log('sukses');
        props.codeOTP([numOne, numTwo, numThree, numFour].join(''));
        props.navigation.navigate('CreateNewPassword');
      })
      .catch(err => {
        console.log('failed', err);
        setErrorMessage('Oops. You entered the wrong OTP code');
      });
  };

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
  return (
    <Root>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.main}>
            <KeyboardAvoidingView style={{alignItems: 'center'}}>
              <Text style={styles.title}>Account Verification</Text>
              <Image
                source={require('../assets/images/ava-reset2.png')}
                style={{marginVertical: 20}}
              />
              <Text style={styles.msg1}>
                Enter verification code we just sent to your email address
              </Text>

              <View style={{...styles.otpGroupInput, width: componentWidth}}>
                <TextInput
                  value={numOne}
                  ref={ref}
                  style={styles.formInput}
                  maxLength={1}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={code => {
                    if (code.length === 1) {
                      ref2.current.focus();
                    }
                    setNumOne(code);
                  }}
                  onPressIn={() => setErrorMessage('')}
                  disableFullscreenUI={true}
                />
                <TextInput
                  value={numTwo}
                  maxLength={1}
                  ref={ref2}
                  style={styles.formInput}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={code => {
                    if (code.length === 1) {
                      ref3.current.focus();
                    } else if (code.length < 1) {
                      ref.current.focus();
                    }
                    setNumTwo(code);
                  }}
                  onPressIn={() => setErrorMessage('')}
                  disableFullscreenUI={true}
                />
                <TextInput
                  value={numThree}
                  ref={ref3}
                  maxLength={1}
                  style={styles.formInput}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={code => {
                    if (code.length === 1) {
                      ref4.current.focus();
                    } else if (code.length < 1) {
                      ref2.current.focus();
                    }
                    setNumThree(code);
                  }}
                  onPressIn={() => setErrorMessage('')}
                  disableFullscreenUI={true}
                />
                <TextInput
                  value={numFour}
                  ref={ref4}
                  maxLength={1}
                  style={styles.formInput}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={code => {
                    if (code.length < 1) {
                      ref3.current.focus();
                    }
                    setNumFour(code);
                  }}
                  onPressIn={() => setErrorMessage('')}
                  disableFullscreenUI={true}
                />
              </View>
              {errorMessage ? (
                <Text
                  style={{
                    ...styles.errorMessage,
                    marginBottom: errorMessage ? 5 : -5,
                  }}>
                  {errorMessage}
                </Text>
              ) : null}
              <View style={styles.txtFooter}>
                <Text style={styles.txtConfirm}>Didn't receive a code?</Text>
                <Text style={styles.txtResend} onPress={sendOTPHandler}>
                  Resend
                </Text>
              </View>
              <Button
                style={{
                  ...styles.buttonLogin,
                  width: componentWidth,
                  opacity: isDisabled ? 0.7 : 1,
                }}
                onPress={verificationHandler}>
                <Text style={styles.buttonLabel}>Verify</Text>
              </Button>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    // height:
    //   Dimensions.get('window').height < 700
    //     ? StatusBar.currentHeight + 700
    //     : StatusBar.currentHeight + Dimensions.get('window').height,
    // height: Dimensions.get('window').height,
    height: Dimensions.get('window').height + StatusBar.currentHeight,

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
  otpGroupInput: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formInput: {
    fontSize: 40,
    borderBottomWidth: 2,
    borderColor: 'black',
    // paddingLeft: 16,
    width: 50,
    textAlign: 'center',
    fontFamily: 'Kanit-Medium',
  },
  txtFooter: {
    paddingTop: 20,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  txtConfirm: {color: '#ADA9BB', fontFamily: 'Kanit-Medium', fontSize: 15},
  txtResend: {
    fontFamily: 'Kanit-Medium',
    marginLeft: 5,
    color: '#5784BA',
    fontSize: 15,
  },
  buttonLogin: {
    width: Dimensions.get('window').width - 64,
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#5784BA',
    height: 50,
    // marginBottom: 100,
  },

  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
  errorMessage: {
    paddingLeft: 16,
    marginTop: 10,
    color: '#EB4335',
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
  idUser: state.auth.resultOtp.idUser,
  msg: state.auth.resultOtp.message,
});
const mapDispatchToProps = dispatch => ({
  sendOTP: (url, data) => {
    dispatch(sendOTP(url, data));
  },
  codeOTP: code => {
    dispatch(codeOTP(code));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification);
