import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Icon, Input, Item} from 'native-base';
import ChatItems from '../components/ChatItems';
function Chat({...props}) {
  const [chatAction, setChatAction] = useState(false);
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
            <Text style={styles.title}>{chatAction ? 'Create' : 'Chat'}</Text>
            <Icon
              name={chatAction ? 'close-circle' : 'add-circle-sharp'}
              style={{color: 'white', fontSize: 32}}
              onPress={() => {
                setChatAction(!chatAction);
              }}
            />
          </View>
          {!chatAction ? (
            <View style={styles.searchSection}>
              <Item style={styles.searchInputContainer}>
                <Icon
                  name="search-outline"
                  style={{color: 'rgba(1, 6, 32, 0.5)'}}
                />
                <Input placeholder="Search" style={styles.searchInput} />
              </Item>
            </View>
          ) : (
            <View style={styles.createSection}>
              <View style={styles.createChat}>
                <Icon
                  name="chatbox-ellipses"
                  onPress={() =>
                    props.navigation.navigate('CreateNewChat', {
                      isGroup: false,
                    })
                  }
                />
              </View>
              <View style={styles.createChat}>
                <Icon
                  name="people"
                  onPress={() =>
                    props.navigation.navigate('CreateNewChat', {
                      isGroup: true,
                    })
                  }
                />
              </View>
            </View>
          )}
        </View>
        {chatAction && <View style={styles.overlay} />}
        <ChatItems />
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
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 32,
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

export default Chat;
