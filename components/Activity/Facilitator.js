/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  LogBox,
  Image,
} from 'react-native';
import {Button, Icon, Input, Item, Picker, Textarea} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';
function Facilitator({...props}) {
  const [myClass, setMyClass] = useState();

  // input state
  const [className, setClassName] = useState('');
  const [categories, setCategories] = useState('');
  const [price, setPrice] = useState('');
  const [schedule, setSchedule] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const [showMode, setShowMode] = useState(false);
  const [showMode2, setShowMode2] = useState(false);
  const [showMode3, setShowMode3] = useState(false);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/instructor/my-course`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => setMyClass(res.data.result))
      .catch(err => console.log(err));
  }, []);

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
  const uploadHandler = e => {
    // console.log(
    //   className,
    //   categories,
    //   description,
    //   price,
    //   schedule,
    //   start,
    //   end,
    //   photo,
    // );
    e.preventDefault();
    const token = props.token;
    console.log(token);
    let formData = new FormData();
    formData.append('name', className);
    formData.append('category_id', categories);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('schedule', schedule);
    formData.append('start_time', start);
    formData.append('end_time', end);
    formData.append('banner', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    });
    axios
      .post(`${DOMAIN_API}:${PORT_API}/data/courses/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res, 'Success');
        setClassName('');
        setCategories('');
        setPrice('');
        setSchedule('');
        setStart('');
        setEnd('');
        setDescription('');
        setPhoto(null);
        props.navigation.navigate('ActivityDashboard');
      })
      .catch(err => {
        props.navigation.navigate('ActivityDashboard');
        console.log(err);
      });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.section}>My class</Text>
          <View style={styles.heading}>
            <Text style={{...styles.headtext, ...styles.name}}>Class Name</Text>
            <Text style={{...styles.headtext, ...styles.student}}>
              Students
            </Text>
          </View>

          {myClass ? (
            <SafeAreaView style={{flex: 1}}>
              <FlatList
                data={myClass.slice(0, 3)}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
                renderItem={({item}) => {
                  return (
                    <View style={styles.myClassItem}>
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
                        <Text style={{fontSize: 16}}>
                          {item.num_of_student}
                        </Text>
                        <Icon
                          style={{fontSize: 20, marginLeft: 3}}
                          name="school-sharp"
                        />
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
                }}
              />
            </SafeAreaView>
          ) : null}

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
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
              <View style={styles.inputSection}>
                <Text>Class Name : </Text>
                <Input
                  value={className}
                  onChangeText={text => {
                    setClassName(text);
                  }}
                />
              </View>
              <View style={styles.inputSection}>
                <Text>Categories : </Text>
                <Item
                  picker
                  style={{
                    width: 300,
                    overflow: 'hidden',
                    borderBottomWidth: 0,
                  }}>
                  <Picker
                    mode="dropdown"
                    style={{width: 50, borderBottomWidth: 0}}
                    placeholder="Select your SIM"
                    placeholderStyle={{color: '#bfc6ea'}}
                    selectedValue={categories}
                    onValueChange={e => setCategories(e)}>
                    <Picker.Item
                      label=""
                      value=""
                      style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                    />
                    <Picker.Item
                      label="Software"
                      value="1"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                    />
                    <Picker.Item
                      label="History"
                      value="2"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                    />
                    <Picker.Item
                      label="Psychology"
                      value="3"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                    />
                    <Picker.Item
                      label="Finance"
                      value="4"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                    />
                    <Picker.Item
                      label="Math"
                      value="5"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                    />
                    <Picker.Item
                      label="Science"
                      value="6"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                    />
                    <Picker.Item
                      label="Office Productivity"
                      value="7"
                      style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                    />
                  </Picker>
                </Item>
              </View>
              <View style={styles.inputSection}>
                <Text>Pricing : </Text>
                <Input value={price} onChangeText={text => setPrice(text)} />
              </View>
              <View style={styles.inputSection}>
                <Text>Schedule : </Text>
                <View
                  style={{width: '100%'}}
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
              </View>
              <View style={styles.inputSection}>
                <Text>Start : </Text>
                <View
                  style={{width: '100%'}}
                  onPress={() => setShowMode2('time')}>
                  <Text
                    style={{width: '100%'}}
                    onPress={() => setShowMode2('time')}>
                    {start.toString().substr(15, 9)}
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
              </View>
              <View style={styles.inputSection}>
                <Text>End : </Text>
                <View
                  style={{width: '100%'}}
                  onPress={() => setShowMode3('time')}>
                  <Text
                    style={{width: '100%'}}
                    onPress={() => setShowMode3('time')}>
                    {end.toString().substr(15, 9)}
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
              </View>

              <View style={styles.inputSection}>
                <Text>Description : </Text>
              </View>
              <Textarea
                rowSpan={5}
                style={{
                  borderRadius: 10,
                  backgroundColor: '#EBEBEB',
                  marginHorizontal: 14,
                }}
                value={description}
                onChangeText={text => setDescription(text)}
              />
              <View
                style={{
                  marginTop: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {photo && (
                  <>
                    <Image
                      source={{uri: photo.uri}}
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
                }}
                onPress={uploadHandler}>
                <Text
                  style={{
                    color: 'white',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 15,
                  }}>
                  Create
                </Text>
              </Button>
            </KeyboardAvoidingView>
          </View>
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
  token: state.auth.result.token,
});
export default connect(mapStateToProps)(Facilitator);
