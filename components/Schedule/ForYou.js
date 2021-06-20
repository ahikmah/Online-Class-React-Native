/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';
function AllSchedule(props) {
  const [schedules, setSchedules] = useState();
  // const [selectedDay, setSelectedDay] = useState();
  let classItems8, classItems11, classItems13, classItems15;

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  useEffect(() => {
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/student/all-schedule?day=${dayName}`,
        {
          headers: {'x-access-token': `Bearer ${token}`},
        },
      )
      .then(res => setSchedules(res.data.result))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/student/all-schedule?day=${props.day}`,
        {
          headers: {'x-access-token': `Bearer ${token}`},
        },
      )
      .then(res => setSchedules(res.data.result))
      .catch(err => console.log(err));
  }, [props.day]);

  if (schedules) {
    classItems8 = schedules
      .filter(item => item.time === '08:00:00')
      .map(cl => {
        return (
          <View style={styles.scheduleItem} key={cl.id}>
            <Text style={styles.scheduleName}>
              {cl.course_name.length > 20
                ? cl.course_name.slice(0, 18) + '...'
                : cl.course_name}
            </Text>
            <ProgressCircle
              percent={cl.progress_in_percent}
              radius={20}
              borderWidth={2.5}
              color="#5784BA"
              shadowColor="#fff"
              bgColor="#fff">
              <Text style={styles.txtProgress}>
                {cl.progress_in_percent + '%'}
              </Text>
            </ProgressCircle>
          </View>
        );
      });
    classItems11 = schedules
      .filter(item => item.time === '11:00:00')
      .map(cl => {
        return (
          <View style={styles.scheduleItem} key={cl.id}>
            <Text style={styles.scheduleName}>
              {cl.course_name.length > 20
                ? cl.course_name.slice(0, 18) + '...'
                : cl.course_name}
            </Text>
            <ProgressCircle
              percent={cl.progress_in_percent}
              radius={20}
              borderWidth={2.5}
              color="#5784BA"
              shadowColor="#fff"
              bgColor="#fff">
              <Text style={styles.txtProgress}>
                {cl.progress_in_percent + '%'}
              </Text>
            </ProgressCircle>
          </View>
        );
      });
    classItems13 = schedules
      .filter(item => item.time === '13:00:00')
      .map(cl => {
        return (
          <View style={styles.scheduleItem} key={cl.id}>
            <Text style={styles.scheduleName}>
              {cl.course_name.length > 20
                ? cl.course_name.slice(0, 18) + '...'
                : cl.course_name}
            </Text>
            <ProgressCircle
              percent={cl.progress_in_percent}
              radius={20}
              borderWidth={2.5}
              color="#5784BA"
              shadowColor="#fff"
              bgColor="#fff">
              <Text style={styles.txtProgress}>
                {cl.progress_in_percent + '%'}
              </Text>
            </ProgressCircle>
          </View>
        );
      });
    classItems15 = schedules
      .filter(item => item.time === '15:00:00')
      .map(cl => {
        return (
          <View style={styles.scheduleItem} key={cl.id}>
            <Text style={styles.scheduleName}>
              {cl.course_name.length > 20
                ? cl.course_name.slice(0, 18) + '...'
                : cl.course_name}
            </Text>
            <ProgressCircle
              percent={cl.progress_in_percent}
              radius={20}
              borderWidth={2.5}
              color="#5784BA"
              shadowColor="#fff"
              bgColor="#fff">
              <Text style={styles.txtProgress}>
                {cl.progress_in_percent + '%'}
              </Text>
            </ProgressCircle>
          </View>
        );
      });
  }

  const noSchedule = (
    <Text style={styles.noSchedule}>You have no schedule in this session!</Text>
  );
  return (
    <>
      <View style={styles.timeSection}>
        <View style={styles.left}>
          <Text style={styles.time}>08.00 - 09.40</Text>
        </View>
        <View style={styles.right}>
          {classItems8 && classItems8.length > 0 ? classItems8 : noSchedule}
        </View>
      </View>
      <View style={styles.timeSection}>
        <View style={styles.left}>
          <Text style={styles.time}>11.00 - 11.40</Text>
        </View>
        <View style={styles.right}>
          {classItems11 && classItems11.length > 0 ? classItems11 : noSchedule}
        </View>
      </View>
      <View style={styles.timeSection}>
        <View style={styles.left}>
          <Text style={styles.time}>13.00 - 13.40</Text>
        </View>
        <View style={styles.right}>
          {classItems13 && classItems13.length > 0 ? classItems13 : noSchedule}
        </View>
      </View>
      <View style={styles.timeSection}>
        <View style={styles.left}>
          <Text style={styles.time}>15.00 - 15.40</Text>
        </View>
        <View style={styles.right}>
          {classItems15 && classItems15.length > 0 ? classItems15 : noSchedule}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  timeSection: {
    flexDirection: 'row',
  },
  left: {
    width: Dimensions.get('window').width / 4,
    padding: 11,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: 'center',
  },
  time: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
  },
  right: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scheduleItem: {
    marginLeft: 5,
    width: '100%',
    paddingVertical: 11,
    paddingHorizontal: 23,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtProgress: {
    color: '#5784BA',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
  },
  scheduleName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  noSchedule: {
    padding: 12,
    marginLeft: 5,
    width: '100%',
    paddingVertical: 11,
    paddingHorizontal: 23,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontStyle: 'italic',
    color: 'red',
  },
});

const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(AllSchedule);
