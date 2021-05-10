import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon} from 'native-base';
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

function Facilitator() {
  let items = [];
  for (let i = 0; i < 7; i++) {
    items.push(
      <View
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
        <View style={styles.calendar}>{items}</View>
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
    // color: 'white',
    color: 'black',
    padding: 2,
  },
  date: {
    fontFamily: 'Kanit-Regular',
    // padding: 3,
    padding: 2,
  },
});

export default Facilitator;
