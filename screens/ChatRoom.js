/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Button, Icon, Textarea, Thumbnail} from 'native-base';
import {connect} from 'react-redux';
import {useSocket} from '../contexts/socketProvider';
import {DOMAIN_API, PORT_API} from '@env';
import axios from 'axios';

function ChatRoom({...props}) {
  const {
    roomName: room,
    sender,
    receiver,
    isGroup,
    groupCreator,
    groupReceiver,
    groupMember,
  } = props.route.params;
  // console.log('room:', room, 'sender:', sender, 'receiver: ', receiver);eka

  const all_data = props.data_user;

  const data_receiver = all_data.findIndex(x => x.id === receiver);
  // console.log(data_receiver, all_data[data_receiver].avatar);

  const scrollViewRef = useRef();
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const [groupMemberCount, setGroupMemberCount] = useState(0);

  const screenHeight = Dimensions.get('window').height;

  const socket = useSocket();
  const token = props.token;
  // let groupMemberCount;

  useEffect(() => {
    console.log(room);
    axios
      .get(`${DOMAIN_API}:${PORT_API}/message/history/${room}`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => {
        // console.log(res.data.result);
        setMessageList(res.data.result);
      })
      .catch(err => console.log(err));

    axios
      .get(`${DOMAIN_API}:${PORT_API}/message/room/${room}`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => {
        console.log(res.data.result[0].count);
        setGroupMemberCount(res.data.result[0].count);
      })
      .catch(err => console.log('room info', err));
  }, []);

  const sendHandler = () => {
    const body = isGroup
      ? {
          room_id: room,
          sender_id: props.user_id,
          content: message,
        }
      : {
          room_id: room,
          sender_id: sender,
          receiver_id: receiver,
          content: message,
        };

    // console.log(body);
    const cb = ({status}) => {
      if (status) {
        setMessageList(prevMessage => {
          return [...prevMessage, body];
        });

        axios
          .post(`${DOMAIN_API}:${PORT_API}/message/send`, body, {
            headers: {'x-access-token': `Bearer ${token}`},
          })
          .then(res => {
            console.log('message stored');
          })
          .catch(err => console.log(err));
      }
    };
    socket.emit('send-message', body, room, cb);
    setMessage('');
  };
  useEffect(() => {
    socket.on('message-received', newMessage => {
      setMessageList(prevMessage => {
        return [...prevMessage, newMessage];
      });
    });

    return () => socket.off('message-received');
  }, [socket]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <View style={styles.topSection}>
          <View style={styles.leftSection}>
            <Icon
              name="chevron-back"
              style={{color: 'white', fontSize: 24}}
              onPress={() =>
                props.navigation.navigate('Chat', {isGroup: isGroup})
              }
            />
            <Thumbnail
              style={styles.avatar}
              source={
                isGroup
                  ? require('../assets/images/group-icon.png')
                  : all_data[data_receiver].avatar
                  ? {
                      uri: `${DOMAIN_API}:${PORT_API}${all_data[data_receiver].avatar}`,
                    }
                  : require('../assets/images/graduate.png')
              }
            />
            <Text
              style={styles.title}
              onPress={() =>
                props.navigation.navigate('Chat', {isGroup: isGroup})
              }>
              {isGroup
                ? `${room.split('_')[1]} (${groupMemberCount})`
                : all_data[data_receiver].full_name}
            </Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView style={{flex: 1}} behavi="padding">
        <ScrollView
          style={styles.chatBallon}
          contentContainerStyle={{paddingBottom: 12}}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {messageList.map((item, index) => {
            let senderIndex = all_data.findIndex(x => x.id === item.sender_id);
            // console.log(senderIndex);
            return (
              <View
                style={
                  item.sender_id === props.user_id
                    ? styles.sender
                    : styles.receiver
                }
                key={index}>
                {item.sender_id !== props.user_id ? (
                  <Text
                    style={
                      item.sender_id === props.user_id
                        ? styles.nameSender
                        : styles.nameReceiver
                    }>
                    {all_data[senderIndex] && item.sender_id !== props.user_id
                      ? all_data[senderIndex].full_name ??
                        all_data[senderIndex].username
                      : null}
                  </Text>
                ) : null}
                <Text
                  style={
                    item.sender_id === props.user_id
                      ? styles.chatContentSender
                      : styles.chatContentReceiver
                  }>
                  {item.content}
                </Text>
                <View
                  style={
                    item.sender_id === props.user_id
                      ? styles.chatInfoSender
                      : styles.chatInfoReceiver
                  }>
                  <Text
                    style={
                      item.sender_id === props.user_id
                        ? styles.timeStampSender
                        : styles.timeStampReceiver
                    }>
                    {item.timestamp
                      ? new Date(item.timestamp)
                          .toLocaleTimeString()
                          .slice(0, 5)
                      : new Date().toLocaleTimeString().slice(0, 5)}
                  </Text>
                  <Icon
                    name="checkmark-outline"
                    style={{fontSize: 20, color: '#ADA9BB'}}
                  />
                </View>
                <View
                  style={
                    item.sender_id === props.user_id
                      ? styles.rightPoint
                      : styles.leftPoint
                  }></View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.inputSection}>
          <View style={styles.chatBox}>
            <Textarea
              // rowSpan={2}
              value={message}
              bordered
              placeholder="Type a message"
              style={styles.inputMessage}
              onChangeText={text => setMessage(text)}
            />
          </View>
          <View>
            <Button style={styles.sendBtn} onPress={sendHandler}>
              <Icon name="send-outline" style={styles.txtSend} />
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* <SelectPersonChat /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6EDF6',
    flex: 1,
  },
  header: {
    paddingTop: StatusBar.currentHeight + 16,
    backgroundColor: '#5784BA',
    paddingHorizontal: 16,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 16,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 43,
    height: 43,
    marginHorizontal: 12,
    borderRadius: 30,
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

  chatBallon: {
    paddingHorizontal: 16,
    // marginTop: 1,
    marginBottom: 10,
    paddingTop: 12,
    flex: 1,
  },

  sender: {
    // flexDirection: '',
    alignSelf: 'flex-end',
    backgroundColor: '#5784BA',
    marginBottom: 12,
    padding: 12,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  chatContentSender: {
    color: '#F9F9F9',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  chatInfoSender: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
  },
  timeStampSender: {
    marginTop: 3,
    marginRight: 3,
    color: '#ADA9BB',
    textAlign: 'right',
  },

  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  chatContentReceiver: {
    color: '#3F4356',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  nameReceiver: {
    color: '#BCB8CF',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
  },
  chatInfoReceiver: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },

  timeStampReceiver: {
    marginRight: 3,
    color: '#ADA9BB',
    textAlign: 'right',
  },

  rightPoint: {
    width: 20,
    height: 20,
    backgroundColor: '#5784BA',
    position: 'absolute',
    right: -10,
    borderTopEndRadius: 30,
    borderBottomStartRadius: 30,
    bottom: -10,
  },
  leftPoint: {
    width: 20,
    height: 20,
    backgroundColor: '#F9F9F9',
    position: 'absolute',
    left: -10,
    borderTopStartRadius: 30,
    borderBottomEndRadius: 30,
    bottom: -10,
  },
  inputSection: {
    // backgroundColor: 'yellow',
    height: 60,
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatBox: {
    width: '85%',
  },
  sendBtn: {
    backgroundColor: '#5784BA',
    height: 50,
    width: 50,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  txtSend: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  inputMessage: {
    textAlignVertical: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 40,
    marginTop: 0,
    height: 55,
    backgroundColor: '#F9F9F9',
    width: '100%',
  },
});

const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
  user_id: state.auth.currentUser.id,
  data_user: state.users.allUser,
});

export default connect(mapStateToProps)(ChatRoom);
