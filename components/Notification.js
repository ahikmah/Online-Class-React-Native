/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {Icon} from 'native-base';
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Image,
} from 'react-native';

function Notification({...props}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notification</Text>
        <Icon
          name="close-circle"
          style={{color: 'white'}}
          onPress={() => props.navigation.goBack()}></Icon>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.timeSection}>Today</Text>
        <View style={styles.itemWrapper}>
          <Image
            style={styles.icon}
            source={require('../assets/images/sample-notif-icon.png')}
          />

          <Text style={styles.item}>
            There are 10 news update for today. Don't miss it!
          </Text>

          <Text style={styles.time}>2 min</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Image
            style={styles.icon}
            source={require('../assets/images/sample-notif-icon2.png')}
          />

          <Text style={styles.item}>You have 2 classes today</Text>

          <Text style={styles.time}>1 hr</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    flex: 1,
    backgroundColor: '#5784BA',
    width: Dimensions.get('window').width,
    height: StatusBar.currentHeight + Dimensions.get('window').height,
    paddingTop: StatusBar.currentHeight + 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 32,
    color: '#fff',
  },
  contentWrapper: {
    paddingHorizontal: 24,
  },
  timeSection: {
    marginVertical: 16,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  item: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    width: '70%',
    paddingLeft: 20,
    // textAlignVertical: 'center',
  },
  time: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    width: '15%',
    textAlign: 'right',
  },
});

export default Notification;
