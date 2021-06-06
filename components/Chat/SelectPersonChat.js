/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
// import chatList from '../../assets/dummy/chatList';
import {ScrollView, StyleSheet} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import {allUser} from '../../redux/Action/users';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';
import axios from 'axios';
import {useSocket} from '../../contexts/socketProvider';

function SelectPersonChat({...props}) {
  const [userList, setUserList] = useState();
  const socket = useSocket();

  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/message`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => {
        // console.log('oke', {...res.data.result});
        setUserList(res.data.result);
        props.allUser(res.data.result);
      })
      .catch(err => console.log(err));
  }, []);

  const selectHandler = receiver_id => {
    const room = `private_${props.sender_id + receiver_id}`;
    const body = [
      {room_id: room, member_id: props.sender_id},
      {room_id: room, member_id: receiver_id},
    ];
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
              sender: props.sender_id,
              receiver: receiver_id,
            });
          })
          .catch(err => console.log(err));
      }
    });
  };

  let userItem;
  if (userList) {
    userItem = userList
      .filter(item => item.id !== props.sender_id)
      .map(item => {
        // let tes = true;
        // let sel = item.select;
        return (
          <List key={item.id} style={styles.list}>
            <ListItem avatar onPress={() => selectHandler(item.id)}>
              <Left>
                <Thumbnail
                  source={
                    item.avatar
                      ? {uri: `${DOMAIN_API}:${PORT_API}${item.avatar}`}
                      : require('../../assets/images/graduate.png')
                  }
                />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.name}>
                  {item.full_name ?? item.username}
                </Text>
              </Body>
              {/* <Right style={{borderBottomWidth: 0}}>
              <CheckBox
                value={sel === tes ? true : false}
                onValueChange={e => (sel = e)}
              />
            </Right> */}
            </ListItem>
          </List>
        );
      });
  }
  return <ScrollView>{userItem}</ScrollView>;
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#F9F9F9',
  },
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
  token: state.auth.resultLogin.token,
  sender_id: state.auth.resultUserData.id,
  username: state.auth.resultUserData.username,
});
const mapDispatchToProps = dispatch => ({
  allUser: data => {
    dispatch(allUser(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectPersonChat);
