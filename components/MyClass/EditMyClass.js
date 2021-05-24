/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Icon, Input, Item, Button, Form, Picker, Textarea} from 'native-base';
import CustomModal from '../../components/CustomModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';

function EditMyClass(props) {
  const {...data} = props.route.params;
  const [courseDetail, setCourseDetail] = useState(false);
  const [courseName, setCourseName] = useState(data.course_name);
  const [category, setCategory] = useState(data.category);
  const [level, setLevel] = useState(data.level);
  const [description, setDescription] = useState(data.description);
  const [objectives, setObjectives] = useState(data.objectives ?? '');
  const [requirements, setRequirements] = useState(data.requirements ?? '');
  const [schedule, setSchedule] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [photo, setPhoto] = useState(null);

  const [showMode, setShowMode] = useState(false);
  const [showMode2, setShowMode2] = useState(false);
  const [showMode3, setShowMode3] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState({
    save: true,
  });

  useEffect(() => {
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/courses/detail/${data.course_id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `Bearer ${props.token}`,
        },
      })
      .then(res => setCourseDetail(res.data.result[0]))
      .catch(err => console.log(err));
  }, []);
  const errorStyle = {
    borderColor: '#EB4335',
    color: '#EB4335',
  };
  const [errorMessage, setErrorMessage] = useState({
    courseName: '',
    category: '',
    description: '',
    objectives: '',
    requirements: '',
    schedule: '',
    start: '',
    end: '',
  });
  const [inputValidation, setInputValidation] = useState({
    courseName: undefined,
    category: undefined,
    description: undefined,
    objectives: undefined,
    requirements: undefined,
    schedule: undefined,
    start: undefined,
    end: undefined,
  });

  // =============================VALIDATION SECTION============================= //
  // coursename : min. length = 5
  const nameValidation = () => {
    if (courseName === '') {
      setInputValidation({...inputValidation, courseName: false});
      setErrorMessage({
        ...errorMessage,
        courseName: "This field can't be empty",
      });
    } else if (courseName.length < 5) {
      setInputValidation({...inputValidation, username: false});
      setErrorMessage({
        ...errorMessage,
        username: 'Course name must be at least 5 characters',
      });
    } else {
      setInputValidation({...inputValidation, username: true});
    }
  };
  const objectiveValidation = () => {
    if (objectives === '') {
      setInputValidation({...inputValidation, objectives: false});
      setErrorMessage({
        ...errorMessage,
        objectives: "This field can't be empty",
      });
    } else if (objectives.length < 5) {
      setInputValidation({...inputValidation, objectives: false});
      setErrorMessage({
        ...errorMessage,
        objectives: 'Course name must be at least 5 characters',
      });
    } else {
      setInputValidation({...inputValidation, objectives: true});
    }
  };
  const descriptionValidation = () => {
    if (description === '') {
      setInputValidation({...inputValidation, description: false});
      setErrorMessage({
        ...errorMessage,
        description: "This field can't be empty",
      });
    } else if (description.length < 5) {
      setInputValidation({...inputValidation, description: false});
      setErrorMessage({
        ...errorMessage,
        description: 'Course name must be at least 5 characters',
      });
    } else {
      setInputValidation({...inputValidation, description: true});
    }
  };
  const requirementsValidation = () => {
    if (requirements === '') {
      setInputValidation({...inputValidation, requirements: false});
      setErrorMessage({
        ...errorMessage,
        requirements: "This field can't be empty",
      });
    } else if (requirements.length < 5) {
      setInputValidation({...inputValidation, requirements: false});
      setErrorMessage({
        ...errorMessage,
        requirements: 'Course name must be at least 5 characters',
      });
    } else {
      setInputValidation({...inputValidation, requirements: true});
    }
  };
  // =============================END VALIDATION SECTION============================= //

  const choosePhotoHandler = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  const launchCameraHandler = () => {
    launchCamera({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  const updateHandler = e => {
    e.preventDefault();
    if (
      inputValidation.courseName !== false &&
      inputValidation.category !== false &&
      inputValidation.description !== false &&
      inputValidation.objectives !== false &&
      inputValidation.requirements !== false &&
      inputValidation.schedule !== false &&
      inputValidation.start !== false &&
      inputValidation.end !== false &&
      (inputValidation.courseName !== undefined ||
        inputValidation.category !== undefined ||
        inputValidation.description !== undefined ||
        inputValidation.objectives !== undefined ||
        inputValidation.requirements !== undefined ||
        inputValidation.schedule !== undefined ||
        inputValidation.start !== undefined ||
        inputValidation.end !== undefined)
    ) {
      const token = props.token;
      let formData = new FormData();
      formData.append('name', courseName);
      formData.append('category_id', category);
      formData.append('description', description);
      formData.append('objectives', objectives);
      formData.append('requirements', requirements);
      formData.append('level', level);
      formData.append('start_time', start);
      formData.append('end_time', end);
      formData.append('schedule', schedule);
      formData.append('banner', photo);

      axios
        .patch(
          `${DOMAIN_API}:${PORT_API}/data/courses/${data.course_id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-access-token': `Bearer ${token}`,
            },
          },
        )
        .then(res => {
          // console.log(res, 'Success');
          props.getDataUser(`${DOMAIN_API}:${PORT_API}/data/users`, token);
          setIsDisabled({
            fullname: true,
            username: true,
            email: true,
            phone: true,
          });
          setModalVisible(false);
          setSuccessModalVisible(true);
        })
        .catch(err => {
          if (err.response.data.error.conflict === 'username') {
            console.log('username is already taken');
            setInputValidation({...inputValidation, username: false});
            setErrorMessage({
              ...errorMessage,
              username: 'This username is already taken',
            });
            setModalVisible(false);
          } else if (err.response.data.error.conflict === 'email') {
            setInputValidation({...inputValidation, email: false});
            setErrorMessage({
              ...errorMessage,
              email: 'This email is already taken',
            });
            setModalVisible(false);
          } else if (err.response.data.error.conflict === 'phone') {
            setInputValidation({...inputValidation, phone: false});
            setErrorMessage({
              ...errorMessage,
              phone: 'This number is already used by another account',
            });
            setModalVisible(false);
          }
        });
    }
  };

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
                onPress={() => props.navigation.goBack()}>
                {data.course_name}
              </Text>
            </View>
            <Text
              style={{
                ...styles.action,
                color:
                  inputValidation.courseName !== false &&
                  inputValidation.username !== false &&
                  inputValidation.email !== false &&
                  inputValidation.phone !== false &&
                  (inputValidation.courseName !== undefined ||
                    inputValidation.username !== undefined ||
                    inputValidation.email !== undefined ||
                    inputValidation.phone !== undefined)
                    ? 'white'
                    : '#ADA9BB',
              }}
              onPress={
                inputValidation.courseName !== false &&
                inputValidation.username !== false &&
                inputValidation.email !== false &&
                inputValidation.phone !== false &&
                (inputValidation.courseName !== undefined ||
                  inputValidation.username !== undefined ||
                  inputValidation.email !== undefined ||
                  inputValidation.phone !== undefined)
                  ? () => setModalVisible(true)
                  : () => setModalVisible(false)
              }>
              Save
            </Text>
          </View>
        </View>

        <ScrollView style={styles.mainSection}>
          <Form>
            <Text style={styles.label}>Course Name</Text>
            <Item style={{marginRight: 20, marginBottom: 15}}>
              <Input
                style={isDisabled.fullname ? styles.disable : styles.active}
                value={courseDetail && courseDetail.course_name}
                onChangeText={text => setCourseName(text)}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, courseName: ''});
                  setInputValidation({
                    ...inputValidation,
                    courseName: undefined,
                  });
                }}
                onBlur={() => {
                  nameValidation();
                }}
                disableFullscreenUI={true}
              />
            </Item>
            <Text style={styles.errorMessage}>{errorMessage.courseName}</Text>

            <Text style={styles.label}>Course Schedule</Text>
            <Item style={{marginRight: 20, marginBottom: 15}}>
              <View
                style={{width: '100%', paddingVertical: 15, paddingLeft: 7}}
                onPress={() => setShowMode('date')}>
                <Text
                  style={{width: '100%'}}
                  onPress={() => setShowMode('date')}>
                  {schedule.toString().substr(4, 12)}
                </Text>
              </View>
              {showMode && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode={showMode}
                  value={new Date()}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setSchedule(selectedDate || schedule);
                    setShowMode(false);
                  }}
                />
              )}
            </Item>

            <Text style={styles.label}>Start Time</Text>
            <Item style={{marginRight: 20, marginBottom: 15}}>
              <View
                style={{width: '100%', paddingVertical: 15, paddingLeft: 7}}
                onPress={() => setShowMode2('time')}>
                <Text
                  style={{width: '100%'}}
                  onPress={() => setShowMode2('time')}>
                  {start.toString().substr(15, 6)}
                </Text>
              </View>
              {showMode2 && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode={showMode2}
                  value={new Date()}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setStart(selectedDate || start);
                    setShowMode2(false);
                  }}
                />
              )}
            </Item>

            <Text style={styles.label}>End Time</Text>
            <Item style={{marginRight: 20, marginBottom: 15}}>
              <View
                style={{width: '100%', paddingVertical: 15, paddingLeft: 7}}
                onPress={() => setShowMode3('time')}>
                <Text
                  style={{width: '100%'}}
                  onPress={() => setShowMode3('time')}>
                  {end.toString().substr(15, 6)}
                </Text>
              </View>
              {showMode3 && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode={showMode3}
                  value={new Date()}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setEnd(selectedDate || end);
                    setShowMode3(false);
                  }}
                />
              )}
            </Item>

            <Text style={styles.label}>Course Category</Text>
            <Item
              style={{marginRight: 15, marginLeft: 15, marginBottom: 15}}
              picker>
              <Picker
                mode="dialog"
                style={{left: -10}}
                placeholder="Select Category"
                // placeholderStyle={{color: '#bfc6ea'}}
                selectedValue={courseDetail && courseDetail.category}
                onValueChange={e => setCategory(e)}>
                <Picker.Item label="Software" value="1" />
                <Picker.Item label="History" value="2" />
                <Picker.Item label="Psychology" value="3" />
                <Picker.Item label="Finance" value="4" />
                <Picker.Item label="Math" value="5" />
                <Picker.Item label="Science" value="6" />
                <Picker.Item label="Office Productivity" value="7" />
              </Picker>
            </Item>

            <Text style={styles.label}>Course Level</Text>
            <Item
              style={{marginRight: 15, marginLeft: 15, marginBottom: 15}}
              picker>
              <Picker
                mode="dialog"
                style={{left: -10}}
                placeholder="Select Category"
                // placeholderStyle={{color: '#bfc6ea'}}
                selectedValue={data.level}
                onValueChange={e => setCategory(e)}>
                <Picker.Item label="Beginner" value="1" />
                <Picker.Item label="Intermediate" value="2" />
                <Picker.Item label="Advance" value="3" />
              </Picker>
            </Item>

            <Text style={styles.label}>Course Description</Text>
            <Item style={{paddingRight: 15, marginBottom: 15}}>
              <Textarea
                rowSpan={3}
                placeholder="Underline Textbox"
                value={description}
                onChangeText={text => setDescription(text)}
              />
            </Item>

            <Text style={styles.label}>Course Objectives</Text>
            <Item
              style={{
                paddingRight: 15,
                marginBottom: 15,
                width: Dimensions.get('window').width / 1.08,
              }}>
              <Textarea
                style={{
                  marginRight: 20,
                }}
                rowSpan={5}
                placeholder="Course Objectives. Please separate each objective point using a hashtag (#)"
                value={objectives}
                onChangeText={text => setObjectives(text)}
              />
            </Item>
            <Text style={styles.label}>Course Requirements</Text>
            <Item
              style={{
                paddingRight: 15,
                marginBottom: 15,
                width: Dimensions.get('window').width / 1.08,
              }}>
              <Textarea
                style={{
                  marginRight: 20,
                }}
                rowSpan={5}
                placeholder="Please separate each requirement point using a hashtag (#)"
                value={requirements}
                onChangeText={text => setRequirements(text)}
              />
            </Item>

            <Text style={styles.label}>Course Icon</Text>
            {photo && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: photo.uri}}
                  style={{
                    width: 250,
                    height: 250,
                  }}
                />
              </View>
            )}

            <View
              style={{
                marginTop: 12,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Button
                onPress={choosePhotoHandler}
                style={{
                  padding: 5,
                  borderRadius: 10,
                  backgroundColor: '#5784BA',
                }}>
                <Text style={{color: 'white'}}>Choose Photo</Text>
              </Button>
              <Button
                onPress={launchCameraHandler}
                style={{
                  padding: 5,
                  borderRadius: 10,
                  backgroundColor: '#5784BA',
                }}>
                <Text style={{color: 'white'}}>Launch Camera</Text>
              </Button>
            </View>
          </Form>

          {modalVisible ? (
            <CustomModal
              iconStyle="confirm"
              modalVisible={modalVisible}
              title="Confirmation"
              msg="Are you sure want to save this change?"
              btnLabel3="Discard Change"
              onAction3={() => {
                setModalVisible(false);
              }}
              btnLabel4="Save Change"
              onAction4={updateHandler}
            />
          ) : null}
          {successModalVisible ? (
            <CustomModal
              iconStyle="success"
              modalVisible={successModalVisible}
              title="Yeay"
              msg="Your changes have been saved successfully!"
              btnLabel="Okay"
              onAction={() => setSuccessModalVisible(false)}
            />
          ) : null}
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
    paddingBottom: 16,
  },
  header: {
    paddingTop: StatusBar.currentHeight + 12 + (40 - StatusBar.currentHeight),
    backgroundColor: '#5784BA',
    paddingHorizontal: 26,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 24,
    zIndex: 2,
    marginBottom: 15,
  },
  //   mainSection: {paddingLeft: 5, paddingRight: 20},
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
  mainSection: {paddingRight: 16},
  action: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
  },
  formItem: {marginBottom: 15},
  label: {paddingLeft: 16, color: '#ADA9BB'},

  disable: {
    color: '#ADA9BB',
  },
  active: {
    color: '#000',
    paddingRight: 40,
  },
  set: {
    position: 'absolute',
    right: 30,
    top: 40,
  },
  forbidden: {
    marginTop: -15,
    paddingLeft: 20,
    color: 'red',
    fontSize: 12,
  },
  errorMessage: {
    marginTop: -15,
    paddingLeft: 20,
    color: 'red',
    fontSize: 12,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(EditMyClass);
