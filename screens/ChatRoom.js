/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Button, Icon, Input, Item, Form, Textarea} from 'native-base';

function ChatRoom({...props}) {
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
                style={{color: 'white', fontSize: 24}}
                onPress={() => props.navigation.goBack()}
              />
              <Text
                style={styles.title}
                onPress={() => props.navigation.navigate('Chat')}>
                Anonim
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.chatBallon}>
          <View style={styles.sender}>
            <Text style={styles.chatContentSender}>Helloo ini saya</Text>
            <View style={styles.rightPoint}></View>
          </View>
          <View style={styles.receiver}>
            <Text style={styles.chatContentReceiver}>Helloo ini dia</Text>
            <View style={styles.leftPoint}></View>
          </View>
          <View style={styles.sender}>
            <Text style={styles.chatContentSender}>Helloo ini saya</Text>
            <View style={styles.rightPoint}></View>
          </View>
          <View style={styles.receiver}>
            <Text style={styles.chatContentReceiver}>Helloo ini dia</Text>
            <View style={styles.leftPoint}></View>
          </View>
          <View style={styles.sender}>
            <Text style={styles.chatContentSender}>Helloo ini saya</Text>
            <View style={styles.rightPoint}></View>
          </View>
          <View style={styles.receiver}>
            <Text style={styles.chatContentReceiver}>Helloo ini dia</Text>
            <View style={styles.leftPoint}></View>
          </View>
          <View style={styles.sender}>
            <Text style={styles.chatContentSender}>Helloo ini saya</Text>
            <View style={styles.rightPoint}></View>
          </View>
          <View style={styles.receiver}>
            <Text style={styles.chatContentReceiver}>Helloo ini dia</Text>
            <View style={styles.leftPoint}></View>
          </View>
          <View style={styles.sender}>
            <Text style={styles.chatContentSender}>Helloo ini saya</Text>
            <View style={styles.rightPoint}></View>
          </View>
          <View style={styles.receiver}>
            <Text style={styles.chatContentReceiver}>Helloo ini dia</Text>
            <View style={styles.leftPoint}></View>
          </View>
        </ScrollView>
        <View style={styles.inputSection}>
          <View style={styles.chatBox}>
            <Textarea
              // rowSpan={2}
              bordered
              placeholder="Type a message"
              style={styles.inputMessage}
            />
          </View>
          <View>
            <Button style={styles.sendBtn}>
              <Icon name="send-outline" style={styles.txtSend} />
            </Button>
          </View>
        </View>
        {/* <SelectPersonChat /> */}
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
    paddingTop: StatusBar.currentHeight + 16,
    backgroundColor: '#5784BA',
    paddingHorizontal: 16,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 16,
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

  chatBallon: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },

  // rightPoint: {
  //   width: 0,
  //   height: 0,
  //   borderLeft: 2,
  //   borderRight: 2,
  //   borderTop: 10,
  //   position: 'absolute',
  //   top: '45%',
  //   right: '-10%',
  //   // transform: rotate(-60),
  // },

  sender: {
    backgroundColor: 'green',
    marginBottom: 12,
    padding: 12,
  },
  receiver: {
    backgroundColor: 'orange',
    padding: 12,
    marginBottom: 12,
  },

  chatContentSender: {
    textAlign: 'right',
  },

  inputSection: {
    backgroundColor: 'yellow',
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
    // top: 0,
    height: 55,
    width: 55,
    borderRadius: 100,
  },

  txtSend: {
    // width: '%',
    color: 'white',
    textAlign: 'center',
    // paddingHorizontal: 12,
  },
  inputMessage: {
    textAlignVertical: 'center',
    // paddingHorizontal: 90,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 40,
    marginTop: 0,
    height: 55,
    backgroundColor: 'red',
    width: '100%',
  },
});
export default ChatRoom;
