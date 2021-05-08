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
import {register} from '../redux/Action/auth';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';
function Register({...props}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dataRegister, setDataRegister] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });
  const [componentWidth, setComponentWidth] = useState(
    Dimensions.get('window').width - 64,
  );
  const [titleMargin, setTitleMargin] = useState(
    Dimensions.get('window').height / 20,
  );

  useEffect(() => {
    const updateLayout = () => {
      setComponentWidth(Dimensions.get('window').width - 64);
      setTitleMargin(Dimensions.get('window').height / 20);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const registerHandler = e => {
    e.preventDefault();
    const data = {
      username: dataRegister.username,
      email: dataRegister.email,
      password: dataRegister.password,
    };
    console.log(data);
    props.register(`${DOMAIN_API}:${PORT_API}/data/auth`, data);
    if (props.auth.isPending) {
      console.log('Loading...');
    } else if (props.auth.isFulfilled) {
      props.navigation.navigate('Login');
    }
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={{...styles.title, marginVertical: titleMargin}}>
            Register
          </Text>
          <View style={{...styles.formContainer, width: componentWidth}}>
            <Form>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Username</Label>
                <Input
                  style={styles.formInput}
                  value={dataRegister.username}
                  onChangeText={text => {
                    setDataRegister({...dataRegister, username: text});
                  }}
                  disableFullscreenUI={false}
                />
              </Item>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Email</Label>
                <Input
                  style={styles.formInput}
                  keyboardType="email-address"
                  value={dataRegister.email}
                  onChangeText={text => {
                    setDataRegister({...dataRegister, email: text});
                  }}
                  disableFullscreenUI={false}
                />
              </Item>
              <Item floatingLabel style={styles.formItem}>
                <Label style={styles.formLabel}>Password</Label>
                <Input
                  secureTextEntry={!showPassword ? true : false}
                  style={styles.formInput}
                  keyboardType={showPassword ? 'visible-password' : null}
                  value={dataRegister.password}
                  onChangeText={text => {
                    setDataRegister({...dataRegister, password: text});
                  }}
                  disableFullscreenUI={false}
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
                  keyboardType={showConfirmPassword ? 'visible-password' : null}
                  value={dataRegister.repassword}
                  onChangeText={text => {
                    setDataRegister({...dataRegister, repassword: text});
                  }}
                  disableFullscreenUI={false}
                />
                <Icon
                  name={!showConfirmPassword ? 'eye' : 'eye-off'}
                  style={styles.eyeToggler}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </Item>
            </Form>
          </View>
          <View style={styles.btnGroup}>
            <Button
              style={{...styles.buttonLogin, width: componentWidth}}
              onPress={registerHandler}>
              <Text style={styles.buttonLabel}>Register</Text>
            </Button>
            <Button style={{...styles.buttonGoogle, width: componentWidth}}>
              <Image source={require('../assets/images/google-icon.png')} />
              <Text style={styles.buttonLabelGoogle}>Register with Google</Text>
            </Button>
          </View>

          <View style={styles.txtFooter}>
            <Text style={styles.txtNewUser}>Already have account?</Text>
            <Text
              style={styles.txtRegister}
              onPress={() => props.navigation.navigate('Login')}>
              Login
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    flexDirection: 'column',
    justifyContent: 'center',
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
    marginLeft: 0,
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
  register: (url, data) => {
    dispatch(register(url, data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
