/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
} from 'native-base';
// import chatList from '../../assets/dummy/chatList';
import {ScrollView, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {allUser} from '../../redux/Action/users';
import {connect} from 'react-redux';
import {DOMAIN_API, PORT_API} from '@env';
import axios from 'axios';
import {useSocket} from '../../contexts/socketProvider';
// import SelectMultiple from 'react-native-select-multiple';
// import {CheckBox} from 'react-native-elements';

function SelectPersonChat({...props}) {
  const socket = useSocket();
  const [dataUser, setDataUser] = useState(props.data_user);
  const dum = [];

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

  const selectMemberHandler = idx => {
    const index = dataUser.findIndex(x => x.index === idx);
    dataUser[index].checked = !dataUser[index].checked;
    console.log(index, idx);
    setDataUser(dataUser);
    props.onSubmit(dum);
  };

  const getSelectedPerson = () => {
    const id = dataUser.map(item => item.id);
    const check = dataUser.map(item => item.checked);
    const selectedPerson = [props.sender_id];
    // console.log('hei', check);

    for (let i = 0; i < check.length; i++) {
      if (check[i] == true) {
        selectedPerson.push(id[i]);
        props.onSubmit(selectedPerson);
      }
    }
    // console.log(selectedPerson);
  };

  const renderUser = () => {
    // console.log(dataUser);
    return dataUser
      .filter(item => item.id !== props.sender_id)
      .map((item, index) => {
        return (
          <List key={index} style={styles.list}>
            <ListItem
              avatar
              onPress={() => {
                selectMemberHandler(item.index);
                getSelectedPerson();
              }}>
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

              <Right style={{borderBottomWidth: 0}}>
                <CheckBox
                  value={item.checked}
                  onValueChange={() => {
                    selectMemberHandler(item.index);
                    getSelectedPerson();
                  }}
                />
              </Right>
            </ListItem>
          </List>
        );
      });
  };

  let userItem;
  if (props.data_user) {
    userItem = props.data_user
      .filter(item => item.id !== props.sender_id)
      .map(item => {
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
            </ListItem>
          </List>
        );
      });
  }
  return <ScrollView>{props.isGroup ? renderUser() : userItem}</ScrollView>;
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
  data_user: state.users.allUser,
});
const mapDispatchToProps = dispatch => ({
  allUser: data => {
    dispatch(allUser(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectPersonChat);
