import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
function PasswordChanged(props, {navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Changed</Text>
      <Image
        source={require('../assets/images/success.png')}
        style={styles.image}
      />
      <Text style={styles.txtLoginBack} onPress={props.onNext}>
        Login to your account
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: StatusBar.currentHeight + 64,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Kanit-Medium',
  },
  image: {
    marginVertical: Dimensions.get('window').height / 10,
  },
  txtLoginBack: {
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
});
export default PasswordChanged;
