/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {Button, Icon} from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';

function Student({...props}) {
  const [myClass, setMyClass] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const scrollRef = useRef();

  const getMyClass = () => {
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/student/my-class?pages=${currPage}`,
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
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/student/my-class?pages=${currPage}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getMyClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

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
  return (
    <>
      <View style={styles.container}>
        {/* <Text style={styles.section}>My class</Text> */}
        <View style={styles.heading}>
          <Text style={{...styles.headtext, ...styles.name}}>Class Name</Text>
          <Text style={{...styles.headtext, ...styles.progress}}>Progress</Text>
          <Text style={{...styles.headtext, ...styles.score}}>Score</Text>
        </View>

        {myClass ? (
          <FlatList
            ref={scrollRef}
            data={myClass}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            style={{marginBottom: 30, paddingBottom: 150}}
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
            ListFooterComponent={
              currPage < totalPage ? (
                <View style={styles.loadMore}>
                  <Button
                    style={styles.btnLoadMore}
                    onPress={() => setCurrPage(currPage + 1)}>
                    <Text style={{color: 'white', fontFamily: 'Roboto-Medium'}}>
                      Load More
                    </Text>
                  </Button>
                </View>
              ) : null
            }
          />
        ) : null}

        {currPage > 2 ? (
          <View>
            <Button
              style={styles.btnBackToTop}
              onPress={() =>
                scrollRef.current.scrollToOffset({
                  animated: true,
                  offset: 0,
                })
              }>
              <Icon name="arrow-up" style={{textAlign: 'center'}} />
            </Button>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    // marginBottom: 150,
    height: Dimensions.get('window').height,
    paddingBottom: 150,
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
  btnBackToTop: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#8199EB',
    zIndex: 100,
    position: 'absolute',
    right: 0,
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});

const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(Student);
