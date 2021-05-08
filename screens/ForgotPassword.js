import React, {useState, useEffect} from 'react';
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

function ForgotPassword({navigation}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="chevron-back" onPress={() => navigation.goBack()} />
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
                <Input style={styles.formInput} />
              </Item>
            </Form>
            <Button
              style={styles.buttonLogin}
              onPress={() => navigation.navigate('CodeVerification')}>
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
    height: Dimensions.get('window').height + StatusBar.currentHeight,
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

export default ForgotPassword;
