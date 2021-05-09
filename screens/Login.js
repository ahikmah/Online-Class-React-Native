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
import SplashScreen from 'react-native-splash-screen';
import {login} from '../redux/Action/auth';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';

function Login({...props}) {
  const [dataLogin, setDataLogin] = useState({username: '', password: ''});

  const [showPassword, setShowPassword] = useState(false);
  const [componentWidth, setComponentWidth] = useState(
    Dimensions.get('window').width - 64,
  );
  const [titleMargin, setTitleMargin] = useState(
    Dimensions.get('window').height / 10,
  );
  // console.log({...props});

  useEffect(() => {
    const updateLayout = () => {
      setComponentWidth(Dimensions.get('window').width - 64);
      setTitleMargin(Dimensions.get('window').height / 10);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const loginHandler = e => {
    e.preventDefault();
    // console.log(dataLogin, DOMAIN_API, PORT_API);
    // const data = {username: dataLogin.username, password: dataLogin.password};
    props.login(`${DOMAIN_API}:${PORT_API}/data/auth/login`, dataLogin);
    SplashScreen.show();
  };

  return (
    <ScrollView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Text style={{...styles.title, marginVertical: titleMargin}}>
          Login
        </Text>
        <KeyboardAvoidingView>
          <View style={{...styles.formContainer, width: componentWidth}}>
            <Form>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Username or Email</Label>
                <Input
                  style={styles.formInput}
                  value={dataLogin.username}
                  onChangeText={text =>
                    setDataLogin({...dataLogin, username: text})
                  }
                  disableFullscreenUI={false}
                  keyboardType="email-address"
                />
              </Item>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Password</Label>
                <Input
                  secureTextEntry={!showPassword ? true : false}
                  keyboardType={showPassword ? 'visible-password' : null}
                  style={styles.formInput}
                  value={dataLogin.password}
                  onChangeText={text =>
                    setDataLogin({...dataLogin, password: text})
                  }
                  disableFullscreenUI={false}
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
          </View>
          <View style={styles.btnGroup}>
            <Button
              style={{...styles.buttonLogin, width: componentWidth}}
              onPress={loginHandler}>
              <Text style={styles.buttonLabel}> Login </Text>
            </Button>
            <Button style={{...styles.buttonGoogle, width: componentWidth}}>
              <Image source={require('../assets/images/google-icon.png')} />
              <Text style={styles.buttonLabelGoogle}> Login with Google </Text>
            </Button>
          </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: Dimensions.get('window').height,
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    alignContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Kanit-Medium',
  },
  formContainer: {
    marginBottom: 12,
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
    marginLeft: 0,
    height: 60,
  },
  formLabel: {
    marginLeft: 16,
    fontFamily: 'Kanit-Regular',
    color: '#ADA9BB',
    fontSize: 16,
  },
  eyeToggler: {
    position: 'absolute',
    right: 0,
    top: 20,
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
    marginTop: 102,
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
    position: 'absolute',
    bottom: 36,
  },
  txtNewUser: {color: '#ADA9BB', fontFamily: 'Kanit-Medium', fontSize: 15},
  txtRegister: {
    fontFamily: 'Kanit-Medium',
    marginLeft: 5,
    color: '#5784BA',
    fontSize: 15,
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
