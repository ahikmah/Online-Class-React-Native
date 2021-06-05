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
import {Button, Icon, Textarea} from 'native-base';
import {connect} from 'react-redux';
import {useSocket} from '../contexts/socketProvider';
function ChatRoom({...props}) {
  const scrollViewRef = useRef();
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const screenHeight = Dimensions.get('window').height;

  const socket = useSocket();

  const sendHandler = () => {
    // console.log(message);
    const body = {
      user_id: props.user_id,
      content: message,
    };
    const cb = ({status}) => {
      if (status) {
        setMessageList(prevMessage => {
          return [...prevMessage, body];
        });
      }
    };
    socket.emit('send-message', body, cb);
  };

  useEffect(() => {
    socket.on('message-received', newMessage => {
      setMessageList(prevMessage => {
        return [...prevMessage, newMessage];
      });
    });
  }, [socket]);

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
        <ScrollView
          style={styles.chatBallon}
          contentContainerStyle={{paddingBottom: 12}}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="height"
            keyboardVerticalOffset={
              screenHeight > 780 ? StatusBar.currentHeight : -180
            }>
            <View style={styles.sender}>
              <Text style={styles.chatContentSender}>
                Helloo ini saya. Apakah dia mau memanjang. bagaimana kalo banyak
                sekaliwkwkwk. Oh tidak, aku ternyata kebawah
              </Text>
              <View style={styles.chatInfoSender}>
                <Text style={styles.timeStampSender}>12.45pm</Text>
                <Icon
                  name="checkmark-outline"
                  style={{fontSize: 20, color: '#ADA9BB'}}
                />
              </View>
              <View style={styles.rightPoint}></View>
            </View>

            <View style={styles.receiver}>
              <Text style={styles.chatContentReceiver}>
                Helloo ini dia.. Tes dulu ini hasiln
              </Text>
              <View style={styles.chatInfoReceiver}>
                <Text style={styles.timeStampReceiver}>13.50 pm</Text>
                <Icon
                  name="checkmark-outline"
                  style={{fontSize: 20, color: '#ADA9BB'}}
                />
              </View>
              <View style={styles.leftPoint}></View>
            </View>

            <View style={styles.sender}>
              <Text style={styles.chatContentSender}>Helloo ini saya</Text>
              <View style={styles.chatInfoSender}>
                <Text style={styles.timeStampSender}>12.45pm</Text>
                <Icon
                  name="checkmark-outline"
                  style={{fontSize: 20, color: '#ADA9BB'}}
                />
              </View>
              <View style={styles.rightPoint}></View>
            </View>

            <View style={styles.receiver}>
              <Text style={styles.chatContentReceiver}>
                Iyaaaa... Apakabarrr??
              </Text>
              <View style={styles.chatInfoReceiver}>
                <Text style={styles.timeStampReceiver}>13.50 pm</Text>
                <Icon
                  name="checkmark-outline"
                  style={{fontSize: 20, color: '#ADA9BB'}}
                />
              </View>
              <View style={styles.leftPoint}></View>
            </View>

            <View style={styles.sender}>
              <Text style={styles.chatContentSender}>
                Helloo ini saya.. wkwkkw
              </Text>
              <View style={styles.chatInfoSender}>
                <Text style={styles.timeStampSender}>12.45pm</Text>
                <Icon
                  name="checkmark-outline"
                  style={{fontSize: 20, color: '#ADA9BB'}}
                />
              </View>
              <View style={styles.rightPoint}></View>
            </View>

            <View style={styles.receiver}>
              <Text style={styles.chatContentReceiver}>
                Mau nyoba tulisan panjang apa ya.. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </Text>
              <View style={styles.chatInfoReceiver}>
                <Text style={styles.timeStampReceiver}>13.50 pm</Text>
                <Icon
                  name="checkmark-outline"
                  style={{fontSize: 20, color: '#ADA9BB'}}
                />
              </View>
              <View style={styles.leftPoint}></View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.inputSection}>
          <View style={styles.chatBox}>
            <Textarea
              // rowSpan={2}
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
  user_id: state.auth.currentUser.id,
});

export default connect(mapStateToProps)(ChatRoom);
