/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import NewsItems from '../components/NewsItems';
import {getDataUser} from '../redux/Action/auth';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';
import {Icon, Input, Item} from 'native-base';
function Home(props) {
  console.log(props.auth.isLogin);
  const [dataUser, setDataUser] = useState('');
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const token = props.token;
      props.getDataUser(`${DOMAIN_API}:${PORT_API}/data/users`, token);
      ref.current = true;
    } else {
      if (props.auth.isUserObtained) {
        setDataUser(props.auth.currentUser);
        SplashScreen.hide();
        console.log(props.auth.currentUser);
      }
    }
  }, [props]);

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
            <Text style={styles.txtGreeting}>Welcome back,</Text>
            <Icon
              name="notifications-sharp"
              style={{color: 'white', fontSize: 24}}
            />
            <View style={styles.notifFlag} />
          </View>
          <Text style={styles.name}>
            {dataUser.full_name ? dataUser.full_name.split(' ')[0] : null}
          </Text>
          <View style={styles.searchSection}>
            <Item style={styles.searchInputContainer}>
              <Icon
                name="search-outline"
                style={{color: 'rgba(1, 6, 32, 0.5)'}}
              />
              <Input
                placeholder="Looking for something?"
                style={styles.searchInput}
              />
            </Item>
          </View>
        </View>
        {/* <Text>{dataUser ? dataUser.role : null}</Text> */}
        <NewsItems />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6EDF6',
  },
  header: {
    paddingTop: StatusBar.currentHeight + 12 + (40 - StatusBar.currentHeight),
    backgroundColor: '#5784BA',
    paddingHorizontal: 26,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 24,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notifFlag: {
    position: 'absolute',
    height: 9,
    width: 9,
    borderRadius: 4.5,
    backgroundColor: 'red',
    borderColor: '#5784BA',
    borderWidth: 1,
    right: 1.9,
    top: 2,
  },
  txtGreeting: {
    fontFamily: 'Kanit-Medium',
    color: 'white',
    fontSize: 20,
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

  searchSection: {
    marginTop: 29.67,
  },
  searchInputContainer: {
    borderWidth: 1,
    backgroundColor: '#E5E6EB',
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 45,
  },
  searchInput: {
    fontFamily: 'Roboto-Medium',
    color: 'rgba(1, 6, 32, 0.5)',
    fontSize: 14,
  },
  info: {
    marginLeft: 33,
  },
  name: {
    color: 'white',
    fontFamily: 'Kanit-Medium',
    fontSize: 32,
  },
  status: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
  token: state.auth.result.token,
});
const mapDispatchToProps = dispatch => ({
  getDataUser: (url, token) => {
    dispatch(getDataUser(url, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
