import React, {useState, useEffect} from 'react';
import {Button, View, StyleSheet, Text, Alert} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import NotifService from '../../NotifService';
// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldShowAlert: true,
//     };
//   },
// });
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

let curr = new Date();
let dt = curr.getDate();
const dayName = dayNames[curr.getDay()];
let monthName = monthNames[curr.getMonth()];
let y = curr.getFullYear();

let weekDayName = [];
let weekDate = [];
let day;

for (let i = 0; i < 7; i++) {
  let first = curr.getDate() - curr.getDay() + i;
  day = new Date(curr.setDate(first)).toISOString().slice(8, 10);
  weekDayName.push(dayNames[i].slice(0, 2));
  weekDate.push(day);
}

function Facilitator(props) {
  const [schedules, setSchedules] = useState();
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegister, setFcmRegister] = useState(false);

  // const onRegister = token => {
  //   setRegisterToken(token.token);
  //   setFcmRegister(true);
  // };
  // const onNotif = notif => {
  //   Alert.alert(notif.title, notif.message);
  // };

  // const notif = new NotifService(onRegister, onNotif);

  // const handlePerm = perms => {
  //   Alert.alert('Permission', JSON.stringify(perms));
  // };

  let scheduleItems;
  useEffect(() => {
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/instructor/my-schedule/?day=${dayName}`,
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
        <View key={cl.id ?? Math.random()} style={styles.scheduleItem}>
          {/* {console.log(cl.id)} */}
          <Text style={styles.time}>{`${cl.start_time.slice(
            0,
            5,
          )} - ${cl.end_time.slice(0, 5)}`}</Text>
          <Text style={styles.scheduleName}>{cl.course_name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.memberCount}>{cl.num_of_member}</Text>
            <Icon name="school-sharp" style={{fontSize: 20}} />
          </View>
        </View>
      );
    });
  }
  const noSchedule = (
    <Text style={styles.noSchedule}>
      You have no schedule today. Keep learning!
    </Text>
  );
  let calendar = [];
  for (let i = 0; i < 7; i++) {
    calendar.push(
      <View
        key={i}
        style={dt === Number(weekDate[i]) ? styles.activeDay : styles.calGroup}>
        <Text
          style={dt === Number(weekDate[i]) ? styles.dayActive : styles.day}>
          {weekDayName[i]}
        </Text>
        <Text
          style={dt === Number(weekDate[i]) ? styles.dayActive : styles.date}>
          {weekDate[i]}
        </Text>
      </View>,
    );
  }

  // const triggerNotificationHandler = () => {
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'My first local notification',
  //       body: 'This is the first local notification we are sending!',
  //       data: {mySpecialData: 'Some text'},
  //     },
  //     trigger: {
  //       seconds: 10,
  //     },
  //   });
  // };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headSection}>
          <Text style={styles.title}>My Class</Text>
          <Icon name="calendar-outline" />
        </View>
        <Text style={styles.today}>
          {monthName} {y}
        </Text>
        <View style={styles.calendar}>{calendar}</View>
        <Button
          title="Trigger Notification"
          // onPress={() => {
          //   this.notif.localNotif();
          // }}
        />
        {scheduleItems && scheduleItems.length > 0 ? scheduleItems : noSchedule}
        <View style={{alignItems: 'center'}}>
          <View style={styles.newTask}>
            <Icon name="add-circle-sharp" style={{color: 'white'}} />
            <Text style={{color: 'white', fontFamily: 'Kanit-Medium'}}>
              New Task
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  headSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
  },
  today: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#010620',
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 22,
  },
  activeDay: {
    backgroundColor: '#5784BA',
    borderRadius: 10,
    padding: 4,
    alignItems: 'center',
  },
  calGroup: {
    padding: 4,
    alignItems: 'center',
  },
  dayActive: {
    color: 'white',
    fontFamily: 'Kanit-Regular',
    padding: 2,
  },
  day: {
    fontFamily: 'Kanit-Regular',
    color: 'black',
    padding: 2,
  },
  date: {
    fontFamily: 'Kanit-Regular',
    padding: 2,
  },

  scheduleItem: {
    // marginLeft: 5,
    width: '100%',
    height: 70,
    paddingVertical: 15,
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
  scheduleName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  memberCount: {
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
  newTask: {
    marginTop: 16,
    backgroundColor: '#5784BA',
    borderRadius: 20,
    height: 40,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(Facilitator);
