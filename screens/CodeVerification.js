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
  TextInput,
} from 'react-native';
import {Button} from 'native-base';

function CodeVerification({navigation}) {
  const [numOne, setNumOne] = useState('');
  const [numTwo, setNumTwo] = useState('');
  const [numThree, setNumThree] = useState('');
  const [numFour, setNumFour] = useState('');
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Account Verification</Text>
          <Image source={require('../assets/images/ava-reset2.png')} />
          <Text style={styles.msg1}>
            Enter verification code we just sent to your email address
          </Text>

          <KeyboardAvoidingView behavior="padding">
            <View style={styles.otpGroupInput}>
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
              />
            </View>
            <View style={styles.txtFooter}>
              <Text style={styles.txtConfirm}>Didn't receive a code?</Text>
              <Text style={styles.txtResend}>Resend</Text>
            </View>
            <Button
              style={styles.buttonLogin}
              onPress={() => navigation.navigate('CreateNewPassword')}>
              <Text style={styles.buttonLabel}>Verify</Text>
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
    height: Dimensions.get('window').height + StatusBar.currentHeight,
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
  },
  main: {
    paddingTop: 9,
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
    marginBottom: 100,
  },

  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
});
export default CodeVerification;
