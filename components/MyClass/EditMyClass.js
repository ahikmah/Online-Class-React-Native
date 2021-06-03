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
  // console.log(data);
  let categoryID;
  if (data.category === 'Software') {
    categoryID = 1;
  } else if (data.category === 'History') {
    categoryID = 2;
  } else if (data.category === 'Psychology') {
    categoryID = 3;
  } else if (data.category === 'Finance') {
    categoryID = 4;
  } else if (data.category === 'Math') {
    categoryID = 5;
  } else if (data.category === 'Science') {
    categoryID = 6;
  } else if (data.category === 'Office Productivity') {
    categoryID = 7;
  } else if (data.category === 'Design') {
    categoryID = 8;
  }
  const [courseDetail, setCourseDetail] = useState(false);
  const [courseName, setCourseName] = useState(data.course_name);
  const [category, setCategory] = useState(categoryID);
  const [level, setLevel] = useState(data.level ?? 1);
  const [description, setDescription] = useState(data.description);
  const [objectives, setObjectives] = useState(data.objectives ?? '');
  const [requirements, setRequirements] = useState(data.requirements ?? '');
  const [schedule, setSchedule] = useState(data.day);
  const [start, setStart] = useState(data.start_time);
  const [end, setEnd] = useState(data.end_time);
  const [photo, setPhoto] = useState(data.banner ?? null);
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);

  const [day, setDay] = useState(data.day);

  const [showMode, setShowMode] = useState(false);
  const [showMode2, setShowMode2] = useState(false);
  const [showMode3, setShowMode3] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

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
    description: '',
    objectives: '',
    requirements: '',
    schedule: '',
  });
  const [inputValidation, setInputValidation] = useState({
    courseName: undefined,
    description: undefined,
    objectives: undefined,
    requirements: undefined,
    schedule: undefined,
  });
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // =============================VALIDATION SECTION============================= //
  // console.log(courseDetail);
  // coursename : min. length = 5
  const nameValidation = () => {
    if (courseName === '') {
      setInputValidation({...inputValidation, courseName: false});
      setErrorMessage({
        ...errorMessage,
        courseName: "This field can't be empty",
      });
    } else if (courseName.length < 5) {
      setInputValidation({...inputValidation, courseName: false});
      setErrorMessage({
        ...errorMessage,
        courseName: 'Course name must be at least 5 characters',
      });
    } else {
      setInputValidation({...inputValidation, courseName: true});
    }
  };
  const objectiveValidation = () => {
    if (objectives === '') {
      setInputValidation({...inputValidation, objectives: false});
      setErrorMessage({
        ...errorMessage,
        objectives: "This field can't be empty",
      });
    } else if (objectives.length < 10) {
      setInputValidation({...inputValidation, objectives: false});
      setErrorMessage({
        ...errorMessage,
        objectives: 'Course objectives must be at least 5 characters',
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
    } else if (description.length < 10) {
      setInputValidation({...inputValidation, description: false});
      setErrorMessage({
        ...errorMessage,
        description: 'Description must be at least 10 characters',
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

  const scheduleValidation = () => {
    if (start > end) {
      setInputValidation({...inputValidation, schedule: false});
      setErrorMessage({
        ...errorMessage,
        schedule:
          'Incorrect format. Make sure the start time is earlier than the finish time',
      });
    } else {
      setInputValidation({...inputValidation, schedule: true});
    }
  };
  // =============================END VALIDATION SECTION============================= //
  useEffect(() => {
    scheduleValidation();
  }, [schedule, start, end]);
  const choosePhotoHandler = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response.assets) {
        setPhoto(response);
        setIsPhotoChanged(true);
      }
    });
  };
  const launchCameraHandler = () => {
    launchCamera({noData: true}, response => {
      // console.log(response);
      if (response.assets) {
        setPhoto(response);
        setIsPhotoChanged(true);
      }
    });
  };
  const updateHandler = e => {
    // console.log(courseName);
    // console.log(description);
    // console.log(requirements);
    // console.log(objectives);
    // console.log(level);
    // console.log(start);
    // console.log(end);
    // console.log(schedule);
    // console.log(photo);
    // console.log(category);
    e.preventDefault();
    if (
      inputValidation.courseName !== false &&
      inputValidation.description !== false &&
      inputValidation.objectives !== false &&
      inputValidation.requirements !== false &&
      inputValidation.schedule !== false &&
      (inputValidation.courseName !== undefined ||
        inputValidation.description !== undefined ||
        inputValidation.objectives !== undefined ||
        inputValidation.schedule !== undefined ||
        inputValidation.requirements !== undefined)
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
      photo
        ? formData.append('banner', {
            name: photo.assets[0].fileName,
            type: photo.assets[0].type,
            uri: photo.assets[0].uri,
          })
        : null;

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

          setModalVisible(false);
          setSuccessModalVisible(true);

          props.navigation.goBack();
        })
        .catch(err => {
          console.log(err);
          setModalVisible(false);
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
                  inputValidation.description !== false &&
                  inputValidation.objectives !== false &&
                  inputValidation.requirements !== false &&
                  inputValidation.schedule !== false &&
                  (inputValidation.courseName !== undefined ||
                    inputValidation.description !== undefined ||
                    inputValidation.objectives !== undefined ||
                    inputValidation.schedule !== undefined ||
                    inputValidation.requirements !== undefined)
                    ? 'white'
                    : '#ADA9BB',
              }}
              onPress={
                inputValidation.courseName !== false &&
                inputValidation.description !== false &&
                inputValidation.objectives !== false &&
                inputValidation.requirements !== false &&
                inputValidation.schedule !== false &&
                (inputValidation.courseName !== undefined ||
                  inputValidation.description !== undefined ||
                  inputValidation.objectives !== undefined ||
                  inputValidation.schedule !== undefined ||
                  inputValidation.requirements !== undefined)
                  ? () => setModalVisible(true)
                  : () => setModalVisible(false)
              }>
              Save
            </Text>
          </View>
        </View>

        <ScrollView style={styles.mainSection}>
          <Form>
            <Text
              style={
                inputValidation.courseName === false
                  ? {...styles.label, color: errorStyle.color}
                  : {...styles.label}
              }>
              Course Name
            </Text>
            <Item style={{marginRight: 20, marginBottom: 15}}>
              <Input
                value={courseName}
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
                  {day}
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
                    setDay(dayNames[selectedDate.getDay()]);
                    setSchedule(
                      selectedDate.toISOString().slice(0, 10) || schedule,
                    );
                    setShowMode(false);
                  }}
                />
              )}
            </Item>

            <Text
              style={
                inputValidation.schedule === false
                  ? {...styles.label, color: errorStyle.color}
                  : {...styles.label}
              }>
              Start Time
            </Text>
            <Item style={{marginRight: 20, marginBottom: 15}}>
              <View
                style={{width: '100%', paddingVertical: 15, paddingLeft: 7}}
                onPress={() => setShowMode2('time')}>
                <Text
                  style={{width: '100%'}}
                  onPress={() => setShowMode2('time')}>
                  {start.slice(0, 5) + ' WIB'}
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
                    setStart(selectedDate.toTimeString().slice(0, 5) || start);
                    setShowMode2(false);
                  }}
                />
              )}
            </Item>

            <Text
              style={
                inputValidation.schedule === false
                  ? {...styles.label, color: errorStyle.color}
                  : {...styles.label}
              }>
              End Time
            </Text>
            <Item style={{marginRight: 20, marginBottom: 15}}>
              <View
                style={{width: '100%', paddingVertical: 15, paddingLeft: 7}}
                onPress={() => setShowMode3('time')}>
                <Text
                  style={{width: '100%'}}
                  onPress={() => setShowMode3('time')}>
                  {end.slice(0, 5) + ' WIB'}
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
                    setEnd(selectedDate.toTimeString().slice(0, 5) || end);
                    setShowMode3(false);
                  }}
                />
              )}
            </Item>
            {inputValidation.schedule === false ? (
              <Text style={styles.errorMessage}>{errorMessage.schedule}</Text>
            ) : null}

            <Text style={styles.label}>Course Category</Text>
            <Item
              style={{marginRight: 15, marginLeft: 15, marginBottom: 15}}
              picker>
              <Picker
                mode="dialog"
                style={{left: -10}}
                placeholder="Select Category"
                // placeholderStyle={{color: '#bfc6ea'}}
                selectedValue={category}
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
                selectedValue={level}
                onValueChange={e => setLevel(e)}>
                <Picker.Item label="Beginner" value="1" />
                <Picker.Item label="Intermediate" value="2" />
                <Picker.Item label="Advance" value="3" />
              </Picker>
            </Item>

            <Text
              style={
                inputValidation.description === false
                  ? {...styles.label, color: errorStyle.color}
                  : {...styles.label}
              }>
              Course Description
            </Text>
            <Item style={{paddingRight: 15, marginBottom: 15}}>
              <Textarea
                rowSpan={3}
                placeholder="Describe your class"
                value={description}
                onChangeText={text => setDescription(text)}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, description: ''});
                  setInputValidation({
                    ...inputValidation,
                    description: undefined,
                  });
                }}
                onBlur={() => {
                  descriptionValidation();
                }}
                disableFullscreenUI={true}
              />
            </Item>
            <Text style={styles.errorMessage}>{errorMessage.description}</Text>

            <Text
              style={
                inputValidation.objectives === false
                  ? {...styles.label, color: errorStyle.color}
                  : {...styles.label}
              }>
              Course Objectives
            </Text>
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
                placeholder="Separate each objective point using a hashtag (#)"
                value={objectives}
                onChangeText={text => setObjectives(text)}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, objectives: ''});
                  setInputValidation({
                    ...inputValidation,
                    objectives: undefined,
                  });
                }}
                onBlur={() => {
                  objectiveValidation();
                }}
                disableFullscreenUI={true}
              />
            </Item>
            <Text style={styles.errorMessage}>{errorMessage.objectives}</Text>

            <Text
              style={
                inputValidation.requirements === false
                  ? {...styles.label, color: errorStyle.color}
                  : {...styles.label}
              }>
              Course Requirements
            </Text>
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
                placeholder="Separate each requirement point using a hashtag (#)"
                value={requirements}
                onChangeText={text => setRequirements(text)}
                onPressIn={() => {
                  setErrorMessage({...errorMessage, requirements: ''});
                  setInputValidation({
                    ...inputValidation,
                    requirements: undefined,
                  });
                }}
                onBlur={() => {
                  requirementsValidation();
                }}
                disableFullscreenUI={true}
              />
            </Item>
            <Text style={styles.errorMessage}>{errorMessage.requirements}</Text>

            <Text style={styles.label}>Course Icon</Text>
            {photo && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{
                    uri: isPhotoChanged
                      ? photo.assets[0].uri
                      : photo
                      ? `${DOMAIN_API}:${PORT_API}${photo}`
                      : photo.assets[0].uri,
                  }}
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
  label: {paddingLeft: 16, color: '#ADA9BB', marginTop: 12},

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
