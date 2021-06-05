/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import chatList from '../../assets/dummy/chatList';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {useSocket} from '../../contexts/socketProvider';

function ChatItems({...props}) {
  const socket = useSocket();
  const joinHandler = room => {
    // console.log(name);
    socket.emit('private-room', room, ({status}) => {
      if (status) {
        console.log(`${props.username} joined ${room} room`);
        props.navigation.navigate('ChatRoom', {roomName: room});
      }
    });
  };
  const chatItem = chatList.map(item => {
    return (
      <List
        key={item.id}
        style={{backgroundColor: '#F9F9F9'}}
        onPress={() => props.navigation.navigate('ChatRoom')}>
        <ListItem avatar>
          <Left>
            <Thumbnail source={item.avatar} />
          </Left>
          <Body style={{borderBottomWidth: 0}}>
            <Text style={styles.name}>{item.name.slice(0, 25)}</Text>
            <Text
              note
              style={styles.message}
              onPress={() => joinHandler(`private_${item.id}`)}>
              {item.note.slice(0, 35)}
            </Text>
          </Body>
          <Right style={{borderBottomWidth: 0}}>
            <Text note style={styles.message}>
              {item.time}
            </Text>
          </Right>
        </ListItem>
      </List>
    );
  });
  return (
    <ScrollView
      style={{
        flex: 1,
        height: Dimensions.get('window').height,
        paddingBottom: 64,
        // marginBottom: 32,
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
});
export default connect(mapStateToProps)(ChatItems);
