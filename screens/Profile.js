/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {ListItem, Icon, Left, Body, Right} from 'native-base';
import CustomModal from '../components/CustomModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';

import {logoutUser} from '../redux/Action/auth';
import {connect} from 'react-redux';

function Profile({...props}) {
  const [avatar, setAvatar] = useState(props.auth.currentUser.avatar);
  const [newAvatar, setNewAvatar] = useState();
  const [name, setName] = useState(
    props.auth.currentUser.full_name ?? props.auth.currentUser.username,
  );
  const [isAvatarUpdate, setIsAvatarUpdate] = useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const [lastSectionPadding, setLastSectionPadding] = useState(
    Dimensions.get('window').height,
  );
  const [superPad, setSuperPad] = useState(650);
  useEffect(() => {
    const updateLayout = () => {
      Dimensions.get('window').height < 400
        ? setSuperPad(180)
        : setSuperPad(650);
      setLastSectionPadding(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });
  useEffect(() => {
    setName(
      props.auth.currentUser.full_name ?? props.auth.currentUser.username,
    );
  }, [props.auth.currentUser.full_name]);

  const choosePhotoHandler = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setNewAvatar(response);
        setIsAvatarUpdate(true);
      } else {
        setNewAvatar(avatar);
      }
    });
  };
  const launchCameraHandler = () => {
    launchCamera({noData: true}, response => {
      // console.log(response);
      if (response) {
        setNewAvatar(response);
        setIsAvatarUpdate(true);
      } else {
        setNewAvatar(avatar);
      }
    });
  };

  const uploadHandler = e => {
    e.preventDefault();
    const token = props.token;
    console.log(token);
    let formData = new FormData();
    formData.append('avatar', {
      name: newAvatar.fileName,
      type: newAvatar.type,
      uri: newAvatar.uri,
    });
    axios
      .patch(`${DOMAIN_API}:${PORT_API}/data/users/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res, 'Success');
        setIsAvatarChanged(true);
        setAvatar(newAvatar);
        setModalVisible(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const logoutHandler = () => {
    console.log(props.token);
    const token = props.token;
    // props.logoutUser();
    props.logoutUser(`${DOMAIN_API}:${PORT_API}/data/auth/logout`, token);
    setLogoutModalVisible(false);
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
          <Text style={styles.title}>Profile</Text>
          <View style={styles.profileSummary}>
            {avatar ? (
              <Image
                source={{
                  uri: isAvatarChanged
                    ? newAvatar.uri
                    : `${DOMAIN_API}:${PORT_API}${avatar}`,
                }}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={
                  isAvatarChanged
                    ? {uri: newAvatar.uri}
                    : require('../assets/images/graduate.png')
                }
                style={styles.avatar}
              />
            )}

            <Icon
              name="camera"
              style={{color: 'white', top: 19, left: -12}}
              onPress={() => setModalVisible(true)}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.status}>online</Text>
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={styles.accountSection}>
            <Text style={styles.nameSection}>Account</Text>
            <ListItem icon style={styles.listItem}>
              <Left>
                <Icon name="person-circle" style={{color: '#3F4356'}} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={styles.item}>Account Setting</Text>
              </Body>
              <Right style={styles.noBorder}>
                <Icon
                  name="chevron-forward"
                  onPress={() => props.navigation.navigate('BasicInfo')}
                />
              </Right>
            </ListItem>
            {/* <ListItem icon style={styles.listItem}>
              <Left>
                <Image source={require('../assets/images/set-phone.png')} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={styles.item}>Phone Numbers</Text>
              </Body>
              <Right style={styles.noBorder}>
                <Icon name="chevron-forward" />
              </Right>
            </ListItem> */}
            <ListItem icon style={styles.listItem}>
              <Left>
                <Image source={require('../assets/images/set-password.png')} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={styles.item}>Change Password</Text>
              </Body>
              <Right style={styles.noBorder}>
                <Icon
                  name="chevron-forward"
                  onPress={() => props.navigation.navigate('ChangePassword')}
                />
              </Right>
            </ListItem>
          </View>
          <View style={styles.main}>
            <Text style={styles.nameSection}>Setting</Text>
            <ListItem icon style={styles.listItem}>
              <Left>
                <Image source={require('../assets/images/set-chat.png')} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={styles.item}>Chat Setting</Text>
              </Body>
              <Right style={styles.noBorder}>
                <Icon name="chevron-forward" />
              </Right>
            </ListItem>
            <ListItem icon style={styles.listItem}>
              <Left>
                <Image source={require('../assets/images/set-notif.png')} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={styles.item}>Push Notification</Text>
              </Body>
              <Right style={styles.noBorder}>
                <Icon name="chevron-forward" />
              </Right>
            </ListItem>
            <ListItem icon style={styles.listItem}>
              <Left>
                <Image source={require('../assets/images/set-privacy.png')} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={styles.item}>Privacy and Security</Text>
              </Body>
              <Right style={styles.noBorder}>
                <Icon name="chevron-forward" />
              </Right>
            </ListItem>
            <ListItem icon style={styles.listItem}>
              <Left>
                <Image source={require('../assets/images/set-storage.png')} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={styles.item}>Data and Storage</Text>
              </Body>
              <Right style={styles.noBorder}>
                <Icon name="chevron-forward" />
              </Right>
            </ListItem>
          </View>

          <View
            style={{
              ...styles.main,
              paddingBottom: lastSectionPadding - superPad,
            }}>
            <Text style={styles.nameSection}>Help</Text>
            <ListItem icon style={styles.listItem}>
              <Left>
                <Image source={require('../assets/images/set-faq.png')} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={styles.item}>F.A.Q</Text>
              </Body>
              <Right style={styles.noBorder}>
                <Icon name="chevron-forward" />
              </Right>
            </ListItem>
            <ListItem
              icon
              style={styles.listItem}
              onPress={() => {
                setLogoutModalVisible(true);
              }}>
              <Left>
                <Image source={require('../assets/images/set-logout.png')} />
              </Left>
              <Body style={styles.noBorder}>
                <Text style={{...styles.item, color: 'red'}}>Logout</Text>
              </Body>
            </ListItem>
          </View>
          {modalVisible ? (
            <CustomModal
              // iconStyle="success"
              modalVisible={modalVisible}
              title="Choose Photo"
              // msg="Your account has been successfully registered. Login now and start learning!"
              content={
                isAvatarUpdate
                  ? {uri: newAvatar.uri}
                  : avatar
                  ? {uri: `${DOMAIN_API}:${PORT_API}${avatar}`}
                  : require('../assets/images/graduate.png')
              }
              btnLabel="Open Gallery"
              onAction={choosePhotoHandler}
              btnLabel2="Launch Camera"
              onAction2={launchCameraHandler}
              btnLabel3="Discard Change"
              onAction3={() => {
                setModalVisible(false);
                setIsAvatarUpdate(false);
                setNewAvatar(avatar);
              }}
              btnLabel4="Save Change"
              onAction4={uploadHandler}
            />
          ) : null}

          {logoutModalVisible ? (
            <CustomModal
              iconStyle="confirm-danger"
              modalVisible={logoutModalVisible}
              title="Confirmation"
              msg="Are you sure want to logout?"
              btnLabel3="Cancel"
              onAction3={() => {
                setLogoutModalVisible(false);
              }}
              btnLabel4="Yes I'm sure"
              onAction4={logoutHandler}
            />
          ) : null}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
  },
  header: {
    paddingTop: StatusBar.currentHeight + 12 + (40 - StatusBar.currentHeight),
    backgroundColor: '#5784BA',
    paddingHorizontal: 26,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 24,
  },
  title: {
    fontFamily: 'Kanit-Medium',
    color: 'white',
    fontSize: 32,
  },
  profileSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
  },
  info: {
    marginLeft: 33,
  },
  name: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  status: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  accountSection: {
    top: -24,
    zIndex: -1,
    paddingTop: 36,
    backgroundColor: '#F9F9F9',
    paddingBottom: 16,
    marginBottom: -24,
  },
  nameSection: {
    paddingHorizontal: 26,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  listItem: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    marginTop: 5,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#F9F9F9',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  item: {
    fontSize: 16,
    fontFamily: 'Kanit-Regular',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  token: state.auth.resultLogin.token,
});
const mapDispatchToProps = dispatch => ({
  logoutUser: (url, token) => {
    dispatch(logoutUser(url, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
