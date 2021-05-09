import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Icon, Input, Item, Label} from 'native-base';

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
        <View style={styles.headSection}>
          <View style={styles.groupInfo}>
            <Image source={require('../assets/images/ava-group-sample.png')} />
            <Input style={styles.groupName} placeholder="Group name" />
          </View>
          <Text style={styles.note}>
            Fill group name and choose optional group profile
          </Text>
        </View>

        <ScrollView style={styles.mainSection}>
          <Text style={styles.txtParticipant}>Participants 3</Text>
          <View style={styles.memberList}>
            <View style={styles.memberItem}>
              <Image
                source={require('../assets/images/ava-member-sample1.png')}
              />
              <Text style={styles.memberName}>You</Text>
            </View>
            <View style={styles.memberItem}>
              <Image
                source={require('../assets/images/ava-member-sample2.png')}
              />
              <Text style={styles.memberName}>Nissa</Text>
            </View>
            <View style={styles.memberItem}>
              <Image
                source={require('../assets/images/ava-member-sample3.png')}
              />
              <Text style={styles.memberName}>Isyana</Text>
            </View>
            <View style={styles.memberItem}>
              <Image
                source={require('../assets/images/add-member-button.png')}
              />
              <Text style={styles.memberName}>Add</Text>
            </View>
          </View>
        </ScrollView>
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
  headSection: {
    // height: 214,
    padding: 24,
    backgroundColor: '#F9F9F9',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupName: {
    marginLeft: 40,
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
  },
  note: {
    color: '#787878',
    fontFamily: 'Roboto-Regular',
    marginTop: 12,
  },
  txtParticipant: {
    fontFamily: 'Kanit-Regular',
    fontSize: 15,
  },

  mainSection: {
    marginTop: 5,
    padding: 24,
    backgroundColor: '#F9F9F9',
  },

  memberList: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberItem: {
    alignItems: 'center',
  },
  memberName: {
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
  },
});
export default ChatGroupDetail;
