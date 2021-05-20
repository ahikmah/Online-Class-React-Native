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

  const sendOTPHandler = e => {
    e.preventDefault();
    props.sendOTP(`${DOMAIN_API}:${PORT_API}/data/auth/send-otp`, {
      email: email,
    });
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
        console.log('failed', {...props.auth.errorOtp});
      }
    }
  }, [
    props.auth.isOtpPending,
    props.auth.isOtpFulfilled,
    props.auth.isOtpRejected,
  ]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="chevron-back" onPress={() => props.navigation.goBack()} />
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

          <KeyboardAvoidingView behavior="padding">
            <Form>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Email</Label>
                <Input
                  style={styles.formInput}
                  value={email}
                  onChangeText={text => setEmail(text)}
                  keyboardType="email-address"
                />
              </Item>
            </Form>
            <Button style={styles.btnSend} onPress={sendOTPHandler}>
              <Text style={styles.buttonLabel}> Send </Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: Dimensions.get('window').height,
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 9,
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
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ADA9BB',
    paddingLeft: 16,
    fontFamily: 'Roboto-Medium',
  },
  formItem: {
    borderBottomWidth: 0,
    height: 60,
    width: Dimensions.get('window').width - 64,
    marginLeft: 0,
  },
  formLabel: {
    marginLeft: 16,
    fontFamily: 'Kanit-Regular',
    color: '#ADA9BB',
    fontSize: 16,
  },
  btnSend: {
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
});

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  sendOTP: (url, data) => {
    console.log('hae', data);
    dispatch(sendOTP(url, data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
