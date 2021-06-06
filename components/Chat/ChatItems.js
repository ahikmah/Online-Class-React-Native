/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Item,
} from 'native-base';
import {useIsFocused} from '@react-navigation/native';

// import chatList from '../../assets/dummy/chatList';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';
import {useSocket} from '../../contexts/socketProvider';
import axios from 'axios';

function ChatItems({...props}) {
  const socket = useSocket();
  const [chatList, setChatList] = useState();
  const isFocused = useIsFocused();

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
    axios
      .get(`${DOMAIN_API}:${PORT_API}/message/list`, {
        headers: {'x-access-token': `Bearer ${props.token}`},
      })
      .then(res => {
        setChatList(res.data.result);
      })
      .catch(err => console.log(err));
  }, [isFocused]);

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

  let chatItem;
  if (chatList) {
    chatItem = chatList.map((item, index) => {
      let receiver;

      if (item.receiver_id === props.user_id) {
        receiver = item.sender_id;
      } else {
        receiver = item.receiver_id;
      }

      const all_data = props.data_user;
      const data_receiver = all_data.findIndex(x => x.id === receiver);
      // console.log(receiver);
      // console.log(all_data);

      return (
        <List
          key={index}
          style={{backgroundColor: '#F9F9F9'}}
          onPress={() => props.navigation.navigate('ChatRoom')}>
          <ListItem avatar onPress={() => joinHandler(receiver)}>
            <Left>
              <Thumbnail
                source={
                  all_data[data_receiver].avatar
                    ? {
                        uri: `${DOMAIN_API}:${PORT_API}${all_data[data_receiver].avatar}`,
                      }
                    : require('../../assets/images/graduate.png')
                }
              />
            </Left>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={styles.name}>
                {all_data[data_receiver].full_name}
              </Text>
              <Text note style={styles.message}>
                {item.last_message.slice(0, 35)}
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
      {chatItem}
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
});
export default connect(mapStateToProps)(ChatItems);
