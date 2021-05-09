import React from 'react';
import {List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import chatList from '../assets/dummy/chatList';
import {ScrollView, StyleSheet} from 'react-native';
function ChatItems() {
  const chatItem = chatList.map(item => {
    return (
      <List key={item.id} style={{backgroundColor: '#F9F9F9'}}>
        <ListItem avatar>
          <Left>
            <Thumbnail source={item.avatar} />
          </Left>
          <Body style={{borderBottomWidth: 0}}>
            <Text style={styles.name}>{item.name.slice(0, 25)}</Text>
            <Text note style={styles.message}>
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
  return <ScrollView>{chatItem}</ScrollView>;
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

export default ChatItems;
