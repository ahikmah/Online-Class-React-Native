/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {Icon, Input, Item, Label, Thumbnail} from 'native-base';
import {connect} from 'react-redux';
import {useSocket} from '../contexts/socketProvider';
import {DOMAIN_API, PORT_API} from '@env';
import axios from 'axios';

function ChatGroupDetail({...props}) {
  const {members} = props.route.params;
  const all_data = props.data_user;
  const myIndex = all_data.findIndex(x => x.id === props.user_id);
  const socket = useSocket();
  const [groupName, setGroupName] = useState('');
  const [showError, setShowError] = useState(false);

  let memberList;
  memberList = all_data
    .filter(item => members.includes(item.id))
    .map(item => {
      if (item.id !== props.user_id) {
        return (
          <View style={styles.memberItem} key={item.user_id}>
            <Thumbnail
              source={
                item.avatar
                  ? {uri: `${DOMAIN_API}:${PORT_API}${item.avatar}`}
                  : require('../assets/images/graduate.png')
              }
            />
            <Text style={styles.memberName}>
              {item.full_name
                ? item.full_name.length > 5
                  ? item.full_name.slice(0, 5) + '...'
                  : item.full_name
                : item.username.length > 5
                ? item.username.slice(0, 5) + '...'
                : item.username}
            </Text>
          </View>
        );
      }
    });

  const createGroupHandler = () => {
    if (groupName.length < 3) {
      setShowError(true);
    } else {
      setShowError(false);
      const rand = Math.floor(1000 + Math.random() * 9000);
      const room = `group_${groupName + '_' + rand}`;
      console.log(room);
      const body = [];
      for (let i = 0; i < members.length; i++) {
        body.push({room_id: room, member_id: members[i]});
      }

      socket.emit('group-room', room, ({status}) => {
        if (status) {
          console.log(`${all_data[myIndex].username} joined ${room} room`);

          const token = props.token;
          axios
            .post(`${DOMAIN_API}:${PORT_API}/message`, body, {
              headers: {'x-access-token': `Bearer ${token}`},
            })
            .then(res => {
              props.navigation.navigate('ChatRoom', {
                isGroup: true,
                roomName: room,
                groupCreator: props.user_id,
                groupReceiver: groupName,
                groupMember: members,
              });
            })
            .catch(err => console.log(err));
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
                style={{color: 'white', fontSize: 32}}
                onPress={() => props.navigation.goBack()}
              />
              <Text
                style={styles.title}
                onPress={() => props.navigation.goBack()}>
                Group details
              </Text>
            </View>
            <Text style={styles.action} onPress={createGroupHandler}>
              Create
            </Text>
          </View>
        </View>
        <View style={styles.headSection}>
          <View style={styles.groupInfo}>
            {/* <Image source={require('../assets/images/ava-group-sample.png')} /> */}
            <Icon name="people-sharp" style={styles.groupPic} />
            <Input
              style={styles.groupName}
              placeholder="Group name"
              value={groupName}
              onChangeText={txt => setGroupName(txt)}
              onPressIn={() => setShowError(false)}
            />
          </View>
          {showError ? (
            <Text style={styles.errorText}>
              You must fill this field with a minimum length of 3 characters
            </Text>
          ) : null}
          <Text style={styles.note}>
            Fill group name and choose optional group profile
          </Text>
        </View>

        <ScrollView
          style={styles.mainSection}
          contentContainerStyle={{paddingBottom: 36}}>
          <Text style={styles.txtParticipant}>
            Participants {members.length}
          </Text>
          <View style={styles.memberList}>
            <View style={styles.memberItem}>
              <Thumbnail
                source={
                  all_data[myIndex].avatar
                    ? {
                        uri: `${DOMAIN_API}:${PORT_API}${all_data[myIndex].avatar}`,
                      }
                    : require('../assets/images/graduate.png')
                }
              />
              <Text style={styles.memberName}>You</Text>
            </View>
            {memberList}
            <Pressable
              style={styles.memberItem}
              onPress={() => props.navigation.goBack()}>
              <Thumbnail
                source={require('../assets/images/add-member-button.png')}
              />
              <Text style={styles.memberName}>Add</Text>
            </Pressable>
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
  groupPic: {
    color: '#F9F9F9',
    width: 65,
    height: 65,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 35,
    backgroundColor: '#5784BA',
    borderRadius: 35,
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
    justifyContent: 'flex-start',
    paddingLeft: 10,
    flexWrap: 'wrap',
  },
  memberItem: {
    marginBottom: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  memberName: {
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
  },

  errorText: {
    color: 'red',
    fontSize: 11,
    position: 'relative',
    left: '35%',
    flexWrap: 'wrap',
    width: '60%',
  },
});

const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
  user_id: state.auth.currentUser.id,
  data_user: state.users.allUser,
});

export default connect(mapStateToProps)(ChatGroupDetail);
