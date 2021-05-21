/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import {Icon, Input, Item, Label, Form} from 'native-base';
import CustomModal from '../../components/CustomModal';

import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {getDataUser} from '../../redux/Action/auth';
import {connect} from 'react-redux';

function BasicInfo({...props}) {
  const [fullName, setFullName] = useState(
    props.auth.currentUser.full_name ?? 'Not set up yet',
  );
  const [username, setUsername] = useState(props.auth.currentUser.username);
  const [email, setEmail] = useState(props.auth.currentUser.email);
  const [phone, setPhone] = useState(
    props.auth.currentUser.phone ?? 'Not set up yet',
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState({
    fullname: true,
    username: true,
    email: true,
    phone: true,
    save: true,
  });

  const errorStyle = {
    borderColor: '#EB4335',
    color: '#EB4335',
  };
  const [errorMessage, setErrorMessage] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
  });
  const [inputValidation, setInputValidation] = useState({
    fullName: undefined,
    username: undefined,
    email: undefined,
    phone: undefined,
  });

  // =============================VALIDATION SECTION============================= //
  // username : min. length = 5
  const fullnameValidation = () => {
    if (fullName === '') {
      setInputValidation({...inputValidation, fullName: false});
      setErrorMessage({...errorMessage, fullName: "This field can't be empty"});
    } else if (fullName && fullName.length < 5) {
      setInputValidation({...inputValidation, fullName: false});
      setErrorMessage({
        ...errorMessage,
        fullName: 'Full name must be at least 5 characters',
      });
    } else {
      setInputValidation({...inputValidation, fullName: true});
    }
  };
  // username : min. length = 5
  const usernameValidation = () => {
    if (username === '') {
      setInputValidation({...inputValidation, username: false});
      setErrorMessage({...errorMessage, username: "This field can't be empty"});
    } else if (username.length < 5) {
      setInputValidation({...inputValidation, username: false});
      setErrorMessage({
        ...errorMessage,
        username: 'Username must be at least 5 characters',
      });
    } else {
      setInputValidation({...inputValidation, username: true});
    }
  };

  // e-mails must be in the format x@x.x
  const isValidEmailAddress = address => {
    return !!address.match(/^[^\s@]+@[^\s@.]+\.[^\s@]+$/);
  };
  const emailValidation = () => {
    if (email === '') {
      setInputValidation({...inputValidation, email: false});
      setErrorMessage({...errorMessage, email: "This field can't be empty"});
    } else if (!isValidEmailAddress(email)) {
      setInputValidation({...inputValidation, email: false});
      setErrorMessage({...errorMessage, email: 'Please enter a valid email'});
    } else {
      setInputValidation({...inputValidation, email: true});
    }
  };
  const isValidPhone = phone_number => {
    return !!phone_number.match(/^[0-9]*$/);
  };
  const phoneValidation = () => {
    if (phone === '') {
      setInputValidation({...inputValidation, phone: false});
      setErrorMessage({...errorMessage, phone: "This field can't be empty"});
    } else if (phone.length < 11 || phone.length > 13) {
      setInputValidation({...inputValidation, phone: false});
      setErrorMessage({
        ...errorMessage,
        phone: 'Must be at least 11 characters and a maximum of 13',
      });
    } else {
      setInputValidation({...inputValidation, phone: true});
    }
  };
  // =============================END VALIDATION SECTION============================= //
  const updateHandler = e => {
    e.preventDefault();
    if (
      inputValidation.fullName !== false &&
      inputValidation.username !== false &&
      inputValidation.email !== false &&
      inputValidation.phone !== false &&
      (inputValidation.fullName !== undefined ||
        inputValidation.username !== undefined ||
        inputValidation.email !== undefined ||
        inputValidation.phone !== undefined)
    ) {
      const token = props.token;
      let formData = new FormData();
      fullName !== props.auth.currentUser.full_name
        ? formData.append('full_name', fullName)
        : null;
      username !== props.auth.currentUser.username
        ? formData.append('username', username)
        : null;
      email !== props.auth.currentUser.email
        ? formData.append('email', email)
        : null;
      phone !== props.auth.currentUser.phone
        ? formData.append('phone', phone)
        : null;

      axios
        .patch(`${DOMAIN_API}:${PORT_API}/data/users/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': `Bearer ${token}`,
          },
        })
        .then(res => {
          // console.log(res, 'Success');
          props.getDataUser(`${DOMAIN_API}:${PORT_API}/data/users`, token);
          setIsDisabled({
            fullname: true,
            username: true,
            email: true,
            phone: true,
          });
          setModalVisible(false);
          setSuccessModalVisible(true);
        })
        .catch(err => {
          if (err.response.data.error.conflict === 'username') {
            console.log('username is already taken');
            setInputValidation({...inputValidation, username: false});
            setErrorMessage({
              ...errorMessage,
              username: 'This username is already taken',
            });
            setModalVisible(false);
          } else if (err.response.data.error.conflict === 'email') {
            setInputValidation({...inputValidation, email: false});
            setErrorMessage({
              ...errorMessage,
              email: 'This email is already taken',
            });
            setModalVisible(false);
          } else if (err.response.data.error.conflict === 'phone') {
            setInputValidation({...inputValidation, phone: false});
            setErrorMessage({
              ...errorMessage,
              phone: 'This number is already used by another account',
            });
            setModalVisible(false);
          }
        });
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topSection}>
            <View style={styles.leftSection}>
              <Icon
                name="chevron-back"
                style={{color: 'white', fontSize: 24}}
                onPress={() => props.navigation.goBack()}
              />
              <Text
                style={styles.title}
                onPress={() => props.navigation.goBack()}>
                Profile
              </Text>
            </View>
            <Text
              style={{
                ...styles.action,
                color:
                  inputValidation.fullName !== false &&
                  inputValidation.username !== false &&
                  inputValidation.email !== false &&
                  inputValidation.phone !== false &&
                  (inputValidation.fullName !== undefined ||
                    inputValidation.username !== undefined ||
                    inputValidation.email !== undefined ||
                    inputValidation.phone !== undefined)
                    ? 'white'
                    : '#ADA9BB',
              }}
              onPress={() => setModalVisible(true)}>
              Save
            </Text>
          </View>
        </View>

        <ScrollView style={styles.mainSection}>
          <Form>
            <Item
              stackedLabel
              style={{
                ...styles.formItem,
                borderBottomColor:
                  inputValidation.fullName === false
                    ? errorStyle.borderColor
                    : null,
              }}>
              <Label
                style={
                  inputValidation.fullName === false
                    ? {
                        color: errorStyle.color,
                      }
                    : null
                }>
                Full Name
              </Label>
              <Input
                style={isDisabled.fullname ? styles.disable : styles.active}
                value={fullName}
                onChangeText={text => setFullName(text)}
                disabled={isDisabled.fullname}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, fullName: ''});
                  setInputValidation({
                    ...inputValidation,
                    fullName: undefined,
                  });
                }}
                onBlur={() => {
                  fullnameValidation();
                }}
                disableFullscreenUI={true}
              />
              <Pressable
                style={styles.set}
                onPressIn={() => {
                  if (fullName === 'Not set up yet') {
                    setFullName('');
                  }
                  setIsDisabled({...isDisabled, fullname: false});
                  fullnameValidation();
                }}>
                <Text style={{color: '#5784BA'}}>SET</Text>
              </Pressable>
            </Item>
            <Text style={styles.errorMessage}>{errorMessage.fullName}</Text>
            <Item
              stackedLabel
              style={{
                ...styles.formItem,
                borderBottomColor:
                  inputValidation.username === false
                    ? errorStyle.borderColor
                    : null,
              }}>
              <Label
                style={
                  inputValidation.username === false
                    ? {
                        color: errorStyle.color,
                      }
                    : null
                }>
                Username
              </Label>
              <Input
                style={isDisabled.username ? styles.disable : styles.active}
                value={username}
                onChangeText={text => setUsername(text)}
                disabled={isDisabled.username}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, username: ''});
                  setInputValidation({
                    ...inputValidation,
                    username: undefined,
                  });
                }}
                onBlur={() => {
                  usernameValidation();
                }}
                disableFullscreenUI={true}
              />
              <Pressable
                style={styles.set}
                onPressIn={() => {
                  setIsDisabled({...isDisabled, username: false});
                  usernameValidation();
                }}>
                <Text style={{color: '#5784BA'}}>SET</Text>
              </Pressable>
            </Item>
            <Text style={styles.errorMessage}>{errorMessage.username}</Text>

            <Item
              stackedLabel
              style={{
                ...styles.formItem,
                borderBottomColor:
                  inputValidation.email === false
                    ? errorStyle.borderColor
                    : null,
              }}>
              <Label
                style={
                  inputValidation.email === false
                    ? {
                        color: errorStyle.color,
                      }
                    : null
                }>
                Email
              </Label>
              <Input
                style={isDisabled.email ? styles.disable : styles.active}
                value={email}
                onChangeText={text => setEmail(text)}
                disabled={isDisabled.email}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, email: ''});
                  setInputValidation({
                    ...inputValidation,
                    email: undefined,
                  });
                }}
                onBlur={() => {
                  emailValidation();
                }}
                disableFullscreenUI={true}
              />
              <Pressable
                style={styles.set}
                onPressIn={() => {
                  setIsDisabled({...isDisabled, email: false});
                  emailValidation();
                }}>
                <Text style={{color: '#5784BA'}}>SET</Text>
              </Pressable>
            </Item>
            <Text style={styles.errorMessage}>{errorMessage.email}</Text>
            <Item
              stackedLabel
              style={{
                ...styles.formItem,
                borderBottomColor:
                  inputValidation.phone === false
                    ? errorStyle.borderColor
                    : null,
              }}>
              <Label
                style={
                  inputValidation.phone === false
                    ? {
                        color: errorStyle.color,
                      }
                    : null
                }>
                Phone Number
              </Label>
              <Input
                style={isDisabled.phone ? styles.disable : styles.active}
                value={phone}
                onChangeText={text => isValidPhone(text) && setPhone(text)}
                keyboardType="numeric"
                disabled={isDisabled.phone}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, phone: ''});
                  setInputValidation({
                    ...inputValidation,
                    phone: undefined,
                  });
                }}
                onBlur={() => {
                  phoneValidation();
                }}
                disableFullscreenUI={true}
              />
              <Pressable
                style={styles.set}
                onPressIn={() => {
                  if (phone === 'Not set up yet') {
                    setPhone('');
                  }
                  setIsDisabled({...isDisabled, phone: false});
                  //   phoneValidation();
                }}>
                <Text style={{color: '#5784BA'}}>SET</Text>
              </Pressable>
            </Item>
            <Text style={styles.errorMessage}>{errorMessage.phone}</Text>

            <Item stackedLabel style={styles.formItem}>
              <Label>Role</Label>
              <Input
                style={styles.disable}
                value={props.auth.currentUser.role}
                disabled={true}
              />
            </Item>
            <Text style={styles.forbidden}>Only admin can change the role</Text>
          </Form>

          {modalVisible ? (
            <CustomModal
              iconStyle="confirm"
              modalVisible={modalVisible}
              title="Confirmation"
              msg="Are you sure want to save this change?"
              btnLabel3="Discard Change"
              onAction3={() => {
                setModalVisible(false);
              }}
              btnLabel4="Save Change"
              onAction4={updateHandler}
            />
          ) : null}
          {successModalVisible ? (
            <CustomModal
              iconStyle="success"
              modalVisible={successModalVisible}
              title="Yeay"
              msg="Your changes have been saved successfully!"
              btnLabel="Okay"
              onAction={() => setSuccessModalVisible(false)}
            />
          ) : null}
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  header: {
    paddingTop: StatusBar.currentHeight + 12 + (40 - StatusBar.currentHeight),
    backgroundColor: '#5784BA',
    paddingHorizontal: 26,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 24,
    zIndex: 2,
    marginBottom: 15,
  },
  //   mainSection: {paddingLeft: 5, paddingRight: 20},
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    color: 'white',
  },
  action: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
  },
  formItem: {marginBottom: 15},

  disable: {
    color: '#ADA9BB',
  },
  active: {
    color: '#000',
    paddingRight: 40,
  },
  set: {
    position: 'absolute',
    right: 30,
    top: 40,
  },
  forbidden: {
    marginTop: -15,
    paddingLeft: 20,
    color: 'red',
    fontSize: 12,
  },
  errorMessage: {
    marginTop: -15,
    paddingLeft: 20,
    color: 'red',
    fontSize: 12,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  token: state.auth.resultLogin.token,
});
const mapDispatchToProps = dispatch => ({
  getDataUser: (url, token) => {
    dispatch(getDataUser(url, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
