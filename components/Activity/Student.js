/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  LogBox,
} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import {Button, Icon, Input, Item, Picker} from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';

function Student({...props}) {
  const [myClass, setMyClass] = useState();
  const [newClass, setNewClass] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isUpdated, setIsUpdated] = useState(false);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const getNewClass = () => {
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/courses/?q=${search}&category=${category}&level=${level}&price=${price}&sort=${sort}&pages=${currPage}`,
        {
          headers: {'x-access-token': `Bearer ${token}`},
        },
      )
      .then(res => {
        if (!search && !category && !price) {
          setNewClass([...newClass, ...res.data.result]);
        } else {
          setNewClass([...res.data.result]);
        }
        setCurrPage(res.data.info.page);
        setTotalPage(res.data.info.totalPage);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/student/my-class`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => setMyClass(res.data.result))
      .catch(err => console.log(err));
    // setIsUpdated(!isUpdated);
    return getNewClass();
  }, []);
  useEffect(() => {
    getNewClass();
    console.log(search);
  }, [currPage, search, category, price]);

  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/student/my-class`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => setMyClass(res.data.result))
      .catch(err => console.log(err));
    // setIsUpdated(!isUpdated);
  }, [isUpdated]);

  const registerHandler = id => {
    const token = props.token;
    axios
      .post(
        `${DOMAIN_API}:${PORT_API}/data/courses/register`,
        {course_id: id},
        {
          headers: {'x-access-token': `Bearer ${token}`},
        },
      )
      .then(res => {
        props.navigation.navigate('MyClass');
        setIsUpdated(true);
      })
      .catch(err => console.log(err));
  };
  const setColor = score => {
    if (myClass) {
      if (Number(score) > 90) {
        return '#2BE6AE';
      } else if (Number(score) > 70) {
        return '#51E72B';
      } else if (Number(score) > 50) {
        return '#CCE72B';
      } else if (Number(score) > 30) {
        return '#E7852B';
      } else {
        return '#E6422B';
      }
    }
  };
  // console.log(currPage, 'nooew');
  // console.log(totalPage, 'total');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.section}>My class</Text>
        <View style={styles.heading}>
          <Text style={{...styles.headtext, ...styles.name}}>Class Name</Text>
          <Text style={{...styles.headtext, ...styles.progress}}>Progress</Text>
          <Text style={{...styles.headtext, ...styles.score}}>Score</Text>
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
                    <View style={styles.tbProgress}>
                      <ProgressCircle
                        percent={item.progress_in_percent}
                        radius={20}
                        borderWidth={2.8}
                        color="#5784BA"
                        shadowColor="#fff"
                        bgColor="#fff">
                        <Text style={styles.txtProgress}>
                          {item.progress_in_percent + '%'}
                        </Text>
                      </ProgressCircle>
                    </View>
                    <Text
                      style={{
                        ...styles.tbScore,
                        color: setColor(item.score),
                      }}>
                      {item.score || 'N/A'}
                    </Text>
                    <Icon
                      name="ellipsis-vertical"
                      style={{
                        position: 'absolute',
                        right: 1,
                        color: '#D2DEED',
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
          <Text style={{...styles.section, paddingLeft: 10}}>New class</Text>
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.searchSection}>
                <Item style={styles.searchInputContainer}>
                  <Icon
                    name="search-outline"
                    style={{color: 'rgba(1, 6, 32, 0.5)'}}
                  />
                  <Input
                    placeholder="Quick Search"
                    style={styles.searchInput}
                    onChangeText={e => setSearch(e)}
                  />
                </Item>
                <Button style={styles.btnSearch} onPress={() => getNewClass()}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 13,
                      textAlign: 'center',
                    }}>
                    Search
                  </Text>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <View style={styles.filterSection}>
            <Item picker style={{width: 100, overflow: 'hidden'}}>
              <Picker
                mode="dropdown"
                style={{width: 145}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={category}
                onValueChange={e => setCategory(e)}>
                <Picker.Item
                  label="Category"
                  value=""
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="Software"
                  value="software"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="History"
                  value="history"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="Psychology"
                  value="psychology"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="Finance"
                  value="finance"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="Math"
                  value="math"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="Science"
                  value="science"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="Office Productivity"
                  value="office productivity"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
              </Picker>
              <Icon
                name="chevron-down-outline"
                style={{position: 'absolute', right: -6, fontSize: 18}}
              />
            </Item>
            <Item picker style={{width: 90, overflow: 'hidden'}}>
              <Picker
                mode="dropdown"
                style={{width: 145}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={price}
                onValueChange={e => setPrice(e)}>
                <Picker.Item
                  label="Pricing"
                  value=""
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="Paid"
                  value="paid"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
                <Picker.Item
                  label="Free"
                  value="free"
                  style={{fontFamily: 'Roboto-Regular', fontSize: 15}}
                />
              </Picker>
              <Icon
                name="chevron-down-outline"
                style={{position: 'absolute', right: 0, fontSize: 18}}
              />
            </Item>
          </View>
          <View style={styles.newClassItems}>
            {newClass ? (
              <FlatList
                data={newClass}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
                renderItem={({item}) => {
                  return (
                    <View style={styles.newClassItem}>
                      <Text
                        style={styles.tbClassName}
                        onPress={() =>
                          props.navigation.navigate('ClassDetail', {
                            ...item,
                          })
                        }>
                        {item.name && item.name.length > 18
                          ? item.name.slice(0, 18) + '...'
                          : item.name}
                      </Text>
                      <Text style={styles.tbClassName}>{item.price}</Text>
                      <Button
                        style={styles.btnRegister}
                        onPress={() => registerHandler(item.id)}>
                        <Text style={styles.txtRegister}>Register</Text>
                      </Button>
                    </View>
                  );
                }}
                ListFooterComponent={
                  currPage < totalPage ? (
                    <View style={styles.loadMore}>
                      <Button
                        style={styles.btnLoadMore}
                        onPress={() => {
                          setCurrPage(currPage + 1);
                        }}>
                        <Text
                          style={{color: 'white', fontFamily: 'Roboto-Medium'}}>
                          Load More
                        </Text>
                      </Button>
                    </View>
                  ) : null
                }
              />
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
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
    width: Dimensions.get('window').width / 2.1,
  },
  progress: {
    width: Dimensions.get('window').width / 4.7,
  },
  score: {
    width: Dimensions.get('window').width / 3,
  },
  myClassItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
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
    width: Dimensions.get('window').width / 2.1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
  },
  tbProgress: {
    width: Dimensions.get('window').width / 4.7,
  },
  tbScore: {
    width: Dimensions.get('window').width / 3,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  txtProgress: {
    color: '#5784BA',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
  },
  moreClass: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
  },
  newClassSection: {
    marginTop: 12,
    // backgroundColor: '#FFFFFF',
    // borderRadius: 5,
    // paddingHorizontal: 14,
    paddingVertical: 25,
  },
  searchSection: {
    flexDirection: 'row',
  },
  searchInputContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 45,
    width: '80%',
  },
  searchInput: {
    fontFamily: 'Montserrat-Medium',
    color: 'rgba(1, 6, 32, 0.5)',
    fontSize: 14,
  },
  btnSearch: {
    width: '20%',
    borderRadius: 5,
    height: 45,
    paddingHorizontal: 10,
    marginTop: 12,
    backgroundColor: '#5784BA',
  },
  filterSection: {
    backgroundColor: '#EEEEEE',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    height: 40,
    overflow: 'hidden',
    marginBottom: 12,
  },
  btnRegister: {
    right: 120,
    top: 5,
    backgroundColor: '#5784BA',
    borderRadius: 10,
    height: 35,
  },
  txtRegister: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    padding: 2,
    paddingHorizontal: 5,
  },
  loadMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  btnLoadMore: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#5784BA',
  },
});

const mapStateToProps = state => ({
  token: state.auth.result.token,
});
export default connect(mapStateToProps)(Student);
