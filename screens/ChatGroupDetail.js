import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {Icon, Input, Item} from 'native-base';

function ChatGroupDetail({...props}) {
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
                style={{color: 'white', fontSize: 32}}
                onPress={() => props.navigation.goBack()}
              />
              <Text
                style={styles.title}
                onPress={() => props.navigation.goBack()}>
                Group details
              </Text>
            </View>
            <Text style={styles.action}>Create</Text>
          </View>
        </View>
        <Text>halo chatttt</Text>
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
    zIndex: 2,
  },
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
    color: 'white',
  },
});
export default ChatGroupDetail;
