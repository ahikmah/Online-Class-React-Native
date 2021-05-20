/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Button, Icon} from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';

function Facilitator({...props}) {
  const [myClass, setMyClass] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getMyClass = () => {
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/instructor/my-course?pages=${currPage}`,
        {
          headers: {'x-access-token': `Bearer ${token}`},
        },
      )
      .then(res => {
        setMyClass([...myClass, ...res.data.result]);
        setCurrPage(res.data.info.page);
        setTotalPage(res.data.info.totalPage);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getMyClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  return (
    <>
      <View style={styles.container}>
        {/* <Text style={styles.section}>My class</Text> */}
        <View style={styles.heading}>
          <Text style={{...styles.headtext, ...styles.name}}>Class Name</Text>
          <Text style={{...styles.headtext, ...styles.student}}>Students</Text>
        </View>

        {myClass ? (
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              data={myClass}
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
                      <Text style={{fontSize: 16}}>{item.num_of_student}</Text>
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
          </SafeAreaView>
        ) : null}
      </View>
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
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(Facilitator);
