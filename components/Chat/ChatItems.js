/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import {useIsFocused} from '@react-navigation/native';

// import chatList from '../../assets/dummy/chatList';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';
import {useSocket} from '../../contexts/socketProvider';
// import {newMessage, resetCount} from '../../redux/Action/chat';

import axios from 'axios';

function ChatItems({...props}) {
  const socket = useSocket();
  const [chatList, setChatList] = useState();
  // const [isNewMessage, setIsNewMessage] = useState(false);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   console.log('count', props.username, props.message_count);
  //   axios
  //     .get(`${DOMAIN_API}:${PORT_API}/message/list`, {
  //       headers: {'x-access-token': `Bearer ${props.token}`},
  //     })
  //     .then(res => {
  //       setChatList(res.data.result);
  //     })
  //     .catch(err => console.log(err));
  // }, [isFocused, props.message_count]);

  useEffect(() => {
    axios
      .get(`${DOMAIN_API}:${PORT_API}/message/list`, {
        headers: {'x-access-token': `Bearer ${props.token}`},
      })
      .then(res => {
        setChatList(res.data.result);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log('count', props.username, props.message_count);

    axios
      .get(`${DOMAIN_API}:${PORT_API}/message/list`, {
        headers: {'x-access-token': `Bearer ${props.token}`},
      })
      .then(res => {
        setChatList(res.data.result);
      })
      .catch(err => console.log(err));
  }, [isFocused, props.message_count, socket]);

  const joinHandler = receiver_id => {
    const room = `private_${props.user_id + receiver_id}`;
    const body = [
      {room_id: room, member_id: props.user_id},
      {room_id: room, member_id: receiver_id},
    ];
    // console.log(name);
    socket.emit('private-room', room, ({status}) => {
      if (status) {
        console.log(`${props.username} joined ${room} room`);

        const token = props.token;
        axios
          .post(`${DOMAIN_API}:${PORT_API}/message`, body, {
            headers: {'x-access-token': `Bearer ${token}`},
          })
          .then(res => {
            props.navigation.navigate('ChatRoom', {
              roomName: room,
              sender: props.user_id,
              receiver: receiver_id,
            });
          })
          .catch(err => console.log(err));
      }
    });
  };
  const joinGroupHandler = room_id => {
    // console.log(name);
    socket.emit('group-room', room_id, ({status}) => {
      if (status) {
        console.log(`${props.username} joined ${room_id} room`);
        props.navigation.navigate('ChatRoom', {
          isGroup: true,
          roomName: room_id,
          groupCreator: props.user_id,
          groupReceiver: room_id,
          // groupMember: 4,
        });
      }
    });
  };

  let chatItem;
  if (chatList) {
    chatItem = chatList.map((item, index) => {
      let isPrivate;
      let receiver;
      let last_sender;
      let data_receiver;
      const all_data = props.data_user;

      if (item.room_id.split('_')[0] === 'group') {
        receiver = item.room_id.split('_')[1];
        isPrivate = false;
      } else if (item.receiver_id === props.user_id) {
        receiver = item.sender_id;
        isPrivate = true;
      } else {
        receiver = item.receiver_id;
        isPrivate = true;
      }

      const chain = all_data[all_data.findIndex(x => x.id === item.sender_id)];

      if (isPrivate) {
        data_receiver = all_data.findIndex(x => x.id === receiver);
      } else {
        last_sender =
          item.sender_id === props.user_id
            ? 'You'
            : chain.full_name
            ? chain.full_name.split(' ')[0]
            : chain.username;
      }

      return (
        <List key={index} style={{backgroundColor: '#F9F9F9'}}>
          <ListItem
            avatar
            onPress={
              isPrivate
                ? () => joinHandler(receiver)
                : () => joinGroupHandler(item.room_id)
            }>
            <Left>
              <Thumbnail
                source={
                  !isPrivate
                    ? require('../../assets/images/group-icon.png')
                    : all_data[data_receiver].avatar
                    ? {
                        uri: `${DOMAIN_API}:${PORT_API}${all_data[data_receiver].avatar}`,
                      }
                    : require('../../assets/images/graduate.png')
                }
              />
            </Left>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={styles.name}>
                {!isPrivate
                  ? receiver
                  : all_data[data_receiver].full_name
                  ? all_data[data_receiver].full_name
                  : all_data[data_receiver].username}
              </Text>
              <Text note style={styles.message}>
                {!isPrivate
                  ? `${last_sender} : ${item.last_message.slice(0, 35)}`
                  : item.last_message.slice(0, 35)}
              </Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
              <Text note style={styles.message}>
                {new Date(item.timestamp).toLocaleTimeString().slice(0, 5)}
              </Text>
            </Right>
          </ListItem>
        </List>
      );
    });
  }
  return (
    <ScrollView
      style={{
        // flex: 1,
        height: Dimensions.get('window').height,
        paddingBottom: 64,
      }}>
      {chatItem ? (
        chatItem
      ) : (
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            marginTop: 50,
          }}>
          Tragically, nothing
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
  message: {
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
  },
});

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  token: state.auth.resultLogin.token,
  user_id: state.auth.currentUser.id,
  data_user: state.users.allUser,
  message_count: state.chat.count,
});
export default connect(mapStateToProps)(ChatItems);
