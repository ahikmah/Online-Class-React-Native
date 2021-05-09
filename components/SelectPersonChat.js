import React from 'react';
import {List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import chatList from '../assets/dummy/chatList';
import {ScrollView, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

function SelectPersonChat() {
  const chatItem = chatList.map(item => {
    let tes = true;
    let sel = item.select;
    return (
      <List key={item.id} style={{backgroundColor: '#F9F9F9'}}>
        <ListItem avatar>
          <Left>
            <Thumbnail source={item.avatar} />
          </Left>
          <Body style={{borderBottomWidth: 0}}>
            <Text style={styles.name}>{item.name.slice(0, 25)}</Text>
          </Body>
          <Right style={{borderBottomWidth: 0}}>
            <CheckBox
              value={sel === tes ? true : false}
              onValueChange={e => (sel = e)}
            />
          </Right>
        </ListItem>
      </List>
    );
  });
  return (
    <ScrollView>
      {chatItem}
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

export default SelectPersonChat;
