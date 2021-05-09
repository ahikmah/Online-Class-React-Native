import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {Icon, Input, Item} from 'native-base';
import SelectPersonChat from '../components/SelectPersonChat';

function ChatNew({...props}) {
  const isGroup = props.route.params.isGroup;
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
                onPress={() => props.navigation.navigate('Chat')}
              />
              <Text
                style={styles.title}
                onPress={() => props.navigation.navigate('Chat')}>
                Choose friends
              </Text>
            </View>
            <Text
              style={styles.action}
              onPress={
                isGroup
                  ? () => props.navigation.navigate('ChatGroupDetail')
                  : null
              }>
              {isGroup ? 'Next' : 'Create'}
            </Text>
          </View>
          <View style={styles.searchSection}>
            <Item style={styles.searchInputContainer}>
              <Icon
                name="search-outline"
                style={{color: 'rgba(1, 6, 32, 0.5)'}}
              />
              <Input placeholder="Search by name" style={styles.searchInput} />
            </Item>
          </View>
        </View>
        <SelectPersonChat />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6EDF6',
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
  createSection: {
    marginTop: 29.67,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  createChat: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(230, 237, 246, 0.75)',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
});
export default ChatNew;
