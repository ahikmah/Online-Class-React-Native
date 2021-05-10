import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';

function ForYou(props) {
  const [schedules, setSchedules] = useState();
  let scheduleItems;
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
  });

  if (schedules) {
    scheduleItems = schedules.map(cl => {
      return (
        <View style={styles.scheduleItem} key={cl.id}>
          <Text style={styles.time}>{`${cl.time.slice(0, 5)} - ${cl.end.slice(
            0,
            5,
          )}`}</Text>
          <Text style={styles.scheduleName}>{cl.course_name}</Text>
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
    <Text style={styles.noSchedule}>
      You have no schedule today. Keep learning!
    </Text>
  );
  return (
    <>
      {scheduleItems && scheduleItems.length > 0 ? scheduleItems : noSchedule}
    </>
  );
}

const styles = StyleSheet.create({
  scheduleItem: {
    // marginLeft: 5,
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
  time: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
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
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontStyle: 'italic',
    color: 'red',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  token: state.auth.result.token,
});
export default connect(mapStateToProps)(ForYou);
