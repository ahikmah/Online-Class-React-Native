/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';

import {useIsFocused} from '@react-navigation/native';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import {Button, Icon, Input, Item, Picker, Textarea} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import CustomModal from '../CustomModal';
import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';

function Facilitator({...props}) {
  const isFocused = useIsFocused();
  const [myClass, setMyClass] = useState();

  const [isCreated, setIsCreated] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [inputValidation, setInputValidation] = useState({
    name: true,
    category: true,
    price: true,
    schedule: true,
    description: true,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: 'Required',
    category: '',
    price: '',
    schedule: '',
    description: '',
  });
  const errorStyle = {
    borderColor: '#EB4335',
    color: '#EB4335',
  };

  // input state
  const [className, setClassName] = useState('');
  const [categories, setCategories] = useState('');
  const [price, setPrice] = useState('');
  const [day, setDay] = useState('');
  const [schedule, setSchedule] = useState('');

  const [startTime, setStartTime] = useState('');
  const [start, setStart] = useState('');

  const [endTime, setEndTime] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [showMode, setShowMode] = useState();
  const [showMode2, setShowMode2] = useState();
  const [showMode3, setShowMode3] = useState();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/instructor/my-course`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => setMyClass(res.data.result))
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/instructor/my-course`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => setMyClass(res.data.result))
      .catch(err => console.log(err));
    setInputValidation({
      name: true,
      category: true,
      price: true,
      schedule: true,
      description: true,
    });
  }, [isCreated, isFocused]);

  const choosePhotoHandler = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response.assets) {
        setPhoto(response);
      }
    });
  };
  const launchCameraHandler = () => {
    launchCamera({noData: true}, response => {
      // console.log(response);
      if (response.assets) {
        setPhoto(response);
      }
    });
  };
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  // console.log(schedule.toISOString().slice(0, 10));
  const uploadHandler = e => {
    e.preventDefault();
    setShowModalConfirm(false);
    setIndicatorVisible(true);
    const token = props.token;
    let formData = new FormData();
    formData.append('name', className);
    formData.append('category_id', categories);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('schedule', schedule.toISOString().slice(0, 10));
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);
    photo
      ? formData.append('banner', {
          name: photo.assets[0].fileName,
          type: photo.assets[0].type,
          uri: photo.assets[0].uri,
        })
      : null;
    axios
      .post(`${DOMAIN_API}:${PORT_API}/data/courses/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log(res, 'Success');
        setClassName('');
        setCategories('');
        setPrice('');
        setSchedule('');
        setStart('');
        setStartTime('');
        setEnd('');
        setEndTime('');
        setDescription('');
        setDay('');
        setPhoto(null);

        setInputValidation({
          name: true,
          category: true,
          price: true,
          schedule: true,
          description: true,
        });
        setIsCreated(!isCreated);
        props.navigation.navigate('ActivityDashboard');
        setIsDisabled(true);
      })
      .catch(err => {
        props.navigation.navigate('ActivityDashboard');
        console.log(err);
      })
      .finally(() => setIndicatorVisible(false));
  };
  let myClassItems;
  if (myClass) {
    // console.log(myClass.length);
    myClassItems = myClass.slice(0, 3).map(item => {
      return (
        <View key={item.course_id} style={styles.myClassItem}>
          <Text
            style={styles.tbClassName}
            onPress={() =>
              props.navigation.navigate('ClassDetail', {
                ...item,
              })
            }>
            {item.course_name}
          </Text>
          <View style={styles.tbStudent}>
            <Text style={{fontSize: 15}}>{item.num_of_student}</Text>
            <Icon style={{fontSize: 18, marginLeft: 3}} name="school-sharp" />
          </View>
          <Icon
            name="chevron-forward"
            style={{
              position: 'absolute',
              right: 10,
              color: 'black',
              fontSize: 24,
            }}
          />
        </View>
      );
    });
  }

  useEffect(() => {
    if (schedule) {
      const today = dayNames[schedule.getDay()];
      setDay(today);
      console.log(today);
    }
  }, [schedule]);
  useEffect(() => {
    if (start) {
      const start_time = start.toTimeString().slice(0, 5);
      setStartTime(start_time);
    }
  }, [start]);
  useEffect(() => {
    if (end) {
      const end_time = end.toTimeString().slice(0, 5);
      setEndTime(end_time);
    }
  }, [end]);

  const nameValidation = () => {
    if (className.length === 0) {
      setInputValidation({...inputValidation, name: false});
      setErrorMessage({...errorMessage, name: "This field can't be empty"});
    } else if (className.length < 5) {
      setInputValidation({...inputValidation, name: false});
      setErrorMessage({
        ...errorMessage,
        name: 'Class name must be at least 5 characters',
      });
    } else {
      setInputValidation({...inputValidation, name: true});
    }
  };

  const categoryValidation = () => {
    if (categories.length < 1) {
      setInputValidation({...inputValidation, category: false});
      setErrorMessage({...errorMessage, category: "This field can't be empty"});
    } else {
      setInputValidation({...inputValidation, category: true});
    }
  };
  const priceValidation = () => {
    if (price.length === 0) {
      setInputValidation({...inputValidation, price: false});
      setErrorMessage({...errorMessage, price: "This field can't be empty"});
    } else {
      setInputValidation({...inputValidation, price: true});
    }
  };
  const scheduleValidation = () => {
    if (schedule.length === 0 || start.length === 0 || end.length === 0) {
      setInputValidation({...inputValidation, schedule: false});
      setErrorMessage({...errorMessage, schedule: "This field can't be empty"});
    } else if (start > end) {
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
  const descriptionValidation = () => {
    if (description.length === 0) {
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

  useEffect(() => {
    if (className && categories && price && schedule && description) {
      setIsDisabled(false);
    }
  }, [className, categories, price, schedule, description]);

  return (
    <>
      {indicatorVisible ? (
        <View
          style={{
            height:
              Dimensions.get('window').height < 700
                ? StatusBar.currentHeight + 700
                : StatusBar.currentHeight + Dimensions.get('window').height,
            position: 'absolute',
            width: '100%',
          }}>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
              // top: '50%',
              backgroundColor: 'white',
              opacity: 0.6,
              zIndex: 10,
            }}>
            <ActivityIndicator size={64} color="#5784BA" />
          </View>
        </View>
      ) : null}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.section}>My class</Text>
          <View style={styles.heading}>
            <Text style={{...styles.headtext, ...styles.name}}>Class Name</Text>
            <Text style={{...styles.headtext, ...styles.student}}>
              Students
            </Text>
          </View>

          {myClass ? myClassItems : null}

          <View style={styles.moreClass}>
            <Text
              style={{fontFamily: 'Montserrat-Medium'}}
              onPress={() => props.navigation.navigate('MyClass')}>
              view all
            </Text>
            <Icon
              name="chevron-forward"
              style={{fontSize: 14}}
              onPress={() => props.navigation.navigate('MyClass')}
            />
          </View>

          <View style={styles.newClassSection}>
            <Text style={{...styles.section, paddingLeft: 10}}>
              Create new class
            </Text>
            <KeyboardAvoidingView style={{flex: 1}}>
              <View style={styles.inputSection}>
                <Text
                  style={{
                    width: 90,
                    color:
                      inputValidation.name === false
                        ? errorStyle.color
                        : '#000',
                  }}>
                  Class Name
                </Text>
                <Text>:</Text>
                <Input
                  value={className}
                  onChangeText={text => {
                    setClassName(text);
                  }}
                  onPressIn={() =>
                    setInputValidation({...inputValidation, name: true})
                  }
                  onBlur={nameValidation}
                  style={{fontSize: 14, paddingLeft: 16}}
                />
              </View>
              {inputValidation.name === false ? (
                <Text style={{...styles.inputSection, color: errorStyle.color}}>
                  {errorMessage.name}
                </Text>
              ) : null}
              <View style={styles.inputSection}>
                <Text
                  style={{
                    width: 90,
                    color:
                      inputValidation.category === false
                        ? errorStyle.color
                        : '#000',
                  }}>
                  Categories
                </Text>
                <Text>:</Text>
                <Item
                  picker
                  style={{
                    width: 300,
                    overflow: 'hidden',
                    borderBottomWidth: 0,
                    fontSize: 12,
                  }}>
                  <Picker
                    mode="dialog"
                    style={{width: 50, borderBottomWidth: 0}}
                    placeholder="Select Category"
                    placeholderStyle={{color: '#bfc6ea'}}
                    selectedValue={categories}
                    onValueChange={e => setCategories(e)}>
                    <Picker.Item
                      label=""
                      value=""
                      style={{fontFamily: 'Roboto-Regular', fontSize: 14}}
                    />
                    <Picker.Item
                      label="Software"
                      value="1"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 14}}
                    />
                    <Picker.Item
                      label="History"
                      value="2"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 14}}
                    />
                    <Picker.Item
                      label="Psychology"
                      value="3"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 14}}
                    />
                    <Picker.Item
                      label="Finance"
                      value="4"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 14}}
                    />
                    <Picker.Item
                      label="Math"
                      value="5"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 14}}
                    />
                    <Picker.Item
                      label="Science"
                      value="6"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 14}}
                    />
                    <Picker.Item
                      label="Office Productivity"
                      value="7"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 14}}
                    />
                  </Picker>
                </Item>
              </View>
              {inputValidation.category === false ? (
                <Text style={{...styles.inputSection, color: errorStyle.color}}>
                  {errorMessage.category}
                </Text>
              ) : null}
              <View style={styles.inputSection}>
                <Text
                  style={{
                    width: 90,
                    color:
                      inputValidation.price === false
                        ? errorStyle.color
                        : '#000',
                  }}>
                  Pricing
                </Text>
                <Text>:</Text>
                <Input
                  value={price}
                  onChangeText={text => setPrice(text)}
                  keyboardType="numeric"
                  onPressIn={() => {
                    setInputValidation({...inputValidation, price: true});

                    categoryValidation();
                  }}
                  onBlur={priceValidation}
                  style={{fontSize: 14, paddingLeft: 15}}
                />
              </View>
              {inputValidation.price === false ? (
                <Text style={{...styles.inputSection, color: errorStyle.color}}>
                  {errorMessage.price}
                </Text>
              ) : null}
              <View style={styles.inputSection}>
                <Text
                  style={{
                    width: 90,
                    color:
                      inputValidation.schedule === false
                        ? errorStyle.color
                        : '#000',
                  }}>
                  Schedule
                </Text>
                <Text>:</Text>

                <View
                  style={{width: 104, paddingLeft: 4}}
                  // onPress={() => setShowMode('date')}
                >
                  <Text
                    style={{width: '100%', fontSize: 14, paddingLeft: 11}}
                    onPress={() => {
                      setShow(true);
                      setShowMode('date');
                      setInputValidation({
                        ...inputValidation,
                        schedule: true,
                      });
                    }}>
                    {day ? day : ''}
                  </Text>
                </View>
                {show && (
                  <DateTimePicker
                    mode={showMode}
                    value={schedule ? schedule : new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShow(false);
                      const scl = selectedDate || schedule;
                      setSchedule(scl);
                      setShow(Platform.OS === 'ios');
                    }}
                  />
                )}
              </View>

              <View style={styles.inputSection}>
                <Text
                  style={{
                    width: 90,
                    color:
                      inputValidation.schedule === false
                        ? errorStyle.color
                        : '#000',
                  }}>
                  Time
                </Text>
                <Text>:</Text>
                <View
                  style={{
                    marginLeft: 14,
                    borderBottomWidth: 1,
                    width: 40,
                  }}
                  // onPress={() => setShowMode2('time')}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      width: '100%',
                    }}
                    onPress={() => {
                      setShow2(true);
                      setShowMode2('time');
                      setInputValidation({
                        ...inputValidation,
                        schedule: true,
                      });
                    }}>
                    {startTime}
                  </Text>
                </View>
                {show2 && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    mode={showMode2}
                    value={start ? start : new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                      // console.log(selectedDate.toTimeString());
                      setShow2(false);
                      setStart(selectedDate || start);
                      // // setShowMode2(false);
                      setShow2(Platform.OS === 'ios');
                    }}
                  />
                )}

                <Text style={{marginLeft: 5, marginRight: 5}}>-</Text>

                <View
                  style={{borderBottomWidth: 1, width: 40}}
                  // onPress={() => setShowMode3('time')}
                >
                  <Text
                    style={{width: '100%', textAlign: 'center'}}
                    onPress={() => {
                      setShow3(true);
                      setShowMode3('time');
                      setInputValidation({
                        ...inputValidation,
                        schedule: true,
                      });
                    }}>
                    {endTime}
                  </Text>
                </View>
                {show3 && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    mode={showMode3}
                    value={end ? end : new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShow3(false);
                      setEnd(selectedDate || end);
                      // // setShowMode2(false);
                      setShow3(Platform.OS === 'ios');
                    }}
                  />
                )}
              </View>
              {inputValidation.schedule === false ? (
                <Text style={{...styles.inputSection, color: errorStyle.color}}>
                  {errorMessage.schedule}
                </Text>
              ) : null}

              <View style={styles.inputSection}>
                <Text
                  style={{
                    width: 90,
                    color:
                      inputValidation.description === false
                        ? errorStyle.color
                        : '#000',
                  }}>
                  Description
                </Text>
              </View>
              <Textarea
                rowSpan={5}
                style={{
                  borderRadius: 10,
                  backgroundColor: '#EBEBEB',
                  marginHorizontal: 14,
                }}
                onPress={() => {
                  setInputValidation({
                    ...inputValidation,
                    description: true,
                  });
                }}
                onBlur={descriptionValidation}
                value={description}
                onChangeText={text => {
                  setDescription(text);
                  scheduleValidation();
                }}
              />
              {inputValidation.description === false ? (
                <Text style={{...styles.inputSection, color: errorStyle.color}}>
                  {errorMessage.description}
                </Text>
              ) : null}
              <View style={styles.inputSection}>
                <Text>Thumbnail (Opsional)</Text>
              </View>
              <View
                style={{
                  marginTop: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {photo && (
                  <>
                    <Image
                      source={{uri: photo.assets[0].uri}}
                      style={{
                        width: 250,
                        height: 250,
                      }}
                    />
                  </>
                )}
              </View>
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

              <Button
                style={{
                  backgroundColor: '#57BA61',
                  width: Dimensions.get('window').width - 100,
                  borderRadius: 14,
                  margin: 14,
                  opacity: isDisabled ? 0.7 : 1,
                }}
                onPress={() => setShowModalConfirm(true)}
                disabled={isDisabled}>
                <Text
                  style={{
                    color: 'white',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 14,
                  }}>
                  Create
                </Text>
              </Button>
            </KeyboardAvoidingView>
          </View>

          {showModalConfirm ? (
            <CustomModal
              iconStyle="confirm"
              modalVisible={showModalConfirm}
              title="Confirmation"
              msg="Are you sure want to create this class?"
              btnLabel3="Cancel"
              onAction3={() => {
                setShowModalConfirm(false);
              }}
              btnLabel4="Yes I'm sure"
              onAction4={uploadHandler}
            />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  section: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  heading: {
    flexDirection: 'row',
    marginBottom: 17,
    paddingHorizontal: 5,
  },
  headtext: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginTop: 16,
  },
  name: {
    width: Dimensions.get('window').width / 1.8,
  },
  student: {
    width: Dimensions.get('window').width / 3,
  },
  myClassItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    height: 60,
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  newClassItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    borderRadius: 5,
    padding: 10,
    height: 65,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tbClassName: {
    width: Dimensions.get('window').width / 1.8,
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
  },
  tbStudent: {
    width: Dimensions.get('window').width / 3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  moreClass: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
  },
  newClassSection: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 25,
  },
  inputSection: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
});

const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(Facilitator);
