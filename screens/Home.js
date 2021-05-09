import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {getDataUser} from '../redux/Action/auth';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';
function Home(props) {
  console.log(props.auth.isLogin);
  const [dataUser, setDataUser] = useState();
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const token = props.token;
      props.getDataUser(`${DOMAIN_API}:${PORT_API}/data/users`, token);
      ref.current = true;
    } else {
      if (props.auth.isUserObtained) {
        SplashScreen.hide();
        console.log(props.auth.currentUser);
        setDataUser(props.auth.currentUser);
      }
    }
  }, [props]);
  dataUser && console.log(dataUser.role);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text>{dataUser ? dataUser.role : null}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: Dimensions.get('window').height + StatusBar.currentHeight,
    backgroundColor: '#F9F9F9',
  },
  main: {
    flex: 1,
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
