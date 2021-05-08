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
function CreateNewPassword({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalShow, setModalShow] = useState(false);
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
                <Label style={styles.formLabel}>Password</Label>
                <Input
                  secureTextEntry={!showPassword ? true : false}
                  style={styles.formInput}
                />
                <Icon
                  name={!showPassword ? 'eye' : 'eye-off'}
                  style={styles.eyeToggler}
                  onPress={() => setShowPassword(!showPassword)}
                />
              </Item>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Confirm Password</Label>
                <Input
                  secureTextEntry={!showConfirmPassword ? true : false}
                  style={styles.formInput}
                />
                <Icon
                  name={!showConfirmPassword ? 'eye' : 'eye-off'}
                  style={styles.eyeToggler}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </Item>
            </Form>
            <Button
              style={styles.buttonLogin}
              onPress={() => setModalShow(true)}>
              <Text style={styles.buttonLabel}>Create</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </View>
      {modalShow && (
        <PasswordChanged onNext={() => navigation.navigate('Login')} />
      )}
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
  eyeToggler: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
});

export default CreateNewPassword;
