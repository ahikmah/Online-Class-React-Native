/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Icon, Input} from 'native-base';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';
import axios from 'axios';
function ProgressModal({...props}) {
  const [progressItems, setProgressItems] = useState();
  const [showModalScore, setShowModalScore] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [scoreData, setScoreData] = useState({
    chapter_id: '',
    enroll_id: '',
    score: '',
    chapter_name: '',
  });
  const [modalSize, setModalSize] = useState(
    Dimensions.get('window').height > 700 ? 0.7 : 1,
  );
  const setColor = num => {
    if (progressItems) {
      if (Number(num) > 90) {
        return '#2BE6AE';
      } else if (Number(num) > 70) {
        return '#51E72B';
      } else if (Number(num) > 50) {
        return '#CCE72B';
      } else if (Number(num) > 30) {
        return '#E7852B';
      } else {
        return '#E6422B';
      }
    }
  };

  useEffect(() => {
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/instructor/member-progress/${props.data.course_id}/${props.data.member_id}`,
        {
          headers: {'x-access-token': `Bearer ${props.token}`},
        },
      )
      .then(res => {
        setProgressItems(res.data.result);
      })
      .catch(err => console.log(err));
  }, []);
  // console.log('UserScore', scoreUser);
  const submitHandler = e => {
    e.preventDefault();

    axios
      .patch(
        `${DOMAIN_API}:${PORT_API}/data/courses/scoring/${scoreData.chapter_id}/${scoreData.enroll_id}`,
        {score: scoreData.score},
        {
          headers: {'x-access-token': `Bearer ${props.token}`},
        },
      )
      .then(res => {
        setShowModalScore(false);
        // console.log('sukses', res);
        setIsUpdated(!isUpdated);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/instructor/member-progress/${props.data.course_id}/${props.data.member_id}`,
        {
          headers: {'x-access-token': `Bearer ${props.token}`},
        },
      )
      .then(res => {
        setProgressItems(res.data.result);
      })
      .catch(err => console.log(err));
  }, [isUpdated]);

  let progressList;
  if (progressItems) {
    // console.log(progressItems);
    progressList = progressItems.map(item => {
      return (
        <View key={item.chapter_name} style={styles.progress}>
          <Text style={styles.topic}>{item.chapter_name}</Text>
          <Text
            style={
              item.score !== 'Unfinished'
                ? {...styles.statusScore, color: setColor(item.score)}
                : styles.unfinished
            }
            onPress={() => {
              setShowModalScore(true);
              setScoreData({
                chapter_id: item.chapter_id,
                enroll_id: item.enroll_id,
                score: item.score,
                chapter_name: item.chapter_name,
              });
            }}>
            {item.score}
          </Text>
          {/* <Text>Tes</Text> */}
          <Icon
            name="create-outline"
            style={{fontSize: 20}}
            onPress={() => {
              setShowModalScore(true);
              setScoreData({
                chapter_id: item.chapter_id,
                enroll_id: item.enroll_id,
                score: item.score,
                chapter_name: item.chapter_name,
              });
            }}
          />
        </View>
      );
    });
  }
  useEffect(() => {
    const updateLayout = () => {
      setModalSize(Dimensions.get('window').height > 700 ? 0.7 : 1);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        fullscreen={true}
        transparent={true}
        visible={props.modalVisible}>
        <View
          style={{
            ...styles.centeredView,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={{...styles.modalView, flex: modalSize}}>
            {showModalScore ? (
              <View
                style={{
                  top: Dimensions.get('window').height / 5,
                  // left: 10,
                  // zIndex: 100,
                  // position: 'absolute',
                }}>
                <View
                  style={{
                    ...styles.scoreModal,
                    backgroundColor: '#5784BA',
                    // height: 100,
                    paddingTop: 15,
                    paddingBottom: 30,
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 10,
                    position: 'absolute',
                    zIndex: 100,
                  }}>
                  <Icon
                    onPress={() => setShowModalScore(false)}
                    name="close-outline"
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 10,
                      color: 'white',
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 16,
                      marginBottom: 10,
                    }}>
                    {scoreData.chapter_name.length > 30
                      ? scoreData.chapter_name.slice(0, 30) + '...'
                      : scoreData.chapter_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '50%',
                      height: 45,
                    }}>
                    <Input
                      style={{
                        backgroundColor: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                        width: 10,
                        height: 45,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        paddingTop: 7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        // textAlignVertical: 'center',
                      }}
                      value={
                        scoreData.score === 'Unfinished'
                          ? setScoreData({...scoreData, score: ''})
                          : scoreData.score.toString()
                      }
                      keyboardType="numeric"
                      // onPressIn={() => console.log('HELLLL', scoreData.score)}
                      onChangeText={text =>
                        setScoreData({...scoreData, score: text})
                      }
                    />

                    <Pressable
                      style={[styles.button, styles.buttonSave]}
                      onPress={submitHandler}>
                      <Text style={styles.textStyle}>Save</Text>
                    </Pressable>

                    {/* <Button style={styles.buttonSave} title="Save" /> */}
                  </View>
                </View>
              </View>
            ) : null}
            <Icon
              onPress={props.onClose}
              name="close-outline"
              style={{position: 'absolute', top: 15, right: 20}}
            />

            <View style={styles.header}>
              <View style={styles.profile}>
                {props.data.avatar ? (
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: `${DOMAIN_API}:${PORT_API}${props.data.avatar}`,
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/graduate.png')}
                    style={styles.avatar}
                  />
                )}
                <Text style={styles.name}>
                  {progressItems && progressItems[0].student_name}
                </Text>
              </View>
              <View style={styles.headerTable}>
                <Text style={styles.tbTopic}>Topic</Text>
                <Text style={styles.tbScore}>Score</Text>
              </View>
            </View>

            <ScrollView style={{marginTop: 16}}>{progressList}</ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    justifyContent: 'space-between',
    // alignItems: 'stretch',
    // flex: Dimensions.get('window').height > 700 ? 0.7 : 1,
    width: '90%',
    height: 'auto',
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderBottomWidth: 1,
  },
  tbTopic: {
    width: '60%',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    paddingLeft: 10,
  },
  tbScore: {
    width: '30%',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  topic: {
    width: '60%',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    paddingLeft: 10,
  },
  score: {
    width: '30%',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  statusScore: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    textAlign: 'center',
    width: '30%',
  },
  unfinished: {
    width: '30%',
    color: 'red',
    textAlign: 'center',
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontFamily: 'Kanit-Regular',
    marginLeft: 16,
    fontSize: 17,
  },
  button: {
    // borderRadius: 15,
    // padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 50,
    // paddingHorizontal: 12,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClose: {
    backgroundColor: '#5784BA',
  },
  buttonSave: {
    backgroundColor: '#57BA61',
  },
  buttonCancel: {
    backgroundColor: '#EB4335',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
  },
  modalText: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  //   iconModal: {
  //     height: Dimensions.get('window').height > 700 ? 250 : 100,
  //     width: Dimensions.get('window').height > 700 ? 170 : 70,
  //   },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    textAlign: 'center',
    color: '#5784BA',
  },
});

const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(ProgressModal);
