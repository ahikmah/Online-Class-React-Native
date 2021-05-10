import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {Icon} from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';

function Student({...props}) {
  const [myClass, setMyClass] = useState();

  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/student/my-class`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => setMyClass(res.data.result))
      .catch(err => console.log(err));
  });

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
    <View>
      <View style={styles.container}>
        <Text style={styles.section}>My class</Text>
        <View style={styles.heading}>
          <Text style={{...styles.headtext, ...styles.name}}>Class Name</Text>
          <Text style={{...styles.headtext, ...styles.progress}}>Progress</Text>
          <Text style={{...styles.headtext, ...styles.score}}>Score</Text>
        </View>

        {myClass ? (
          <FlatList
            data={myClass.slice(0, 3)}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({item}) => {
              return (
                <View style={styles.myClassItem}>
                  <Text style={styles.tbClassName}>{item.course_name}</Text>
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
                    style={{...styles.tbScore, color: setColor(item.score)}}>
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
        ) : null}

        <View style={styles.moreClass}>
          <Text
            style={{fontFamily: 'Montserrat-Medium'}}
            onPress={() => props.navigation.navigate('MyClass')}>
            View all
          </Text>
          <Icon
            name="chevron-forward"
            style={{fontSize: 14}}
            onPress={() => props.navigation.navigate('MyClass')}
          />
        </View>
      </View>
    </View>
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
    fontSize: 14,
    marginTop: 16,
  },
  name: {
    width: Dimensions.get('window').width / 2.1,
  },
  progress: {
    width: Dimensions.get('window').width / 5,
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
  tbClassName: {
    width: Dimensions.get('window').width / 2.1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  tbProgress: {
    width: Dimensions.get('window').width / 5,
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
});

const mapStateToProps = state => ({
  token: state.auth.result.token,
});
export default connect(mapStateToProps)(Student);
