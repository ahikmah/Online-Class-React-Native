/* eslint-disable react-native/no-inline-styles */
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Tab, Tabs, DefaultTabBar} from 'native-base';
// import AllSchedule from './AllSchedule';
import AllSchedule from './AllSchedule';
// import ForYou from './ForYou';
import ForYou from './ForYou';
import DateTimePicker from '@react-native-community/datetimepicker';

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

let monthName = monthNames[curr.getMonth()];
let dayName = dayNames[curr.getDay()];
let dt = curr.getDate();

function Student() {
  const [show, setShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayName);
  const [mode, setMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState(0);
  const [getMonth, setGetMonth] = useState(monthName);
  const [getDate, setGetDate] = useState(dt);

  const renderTabBar = props => {
    props.tabStyle = Object.create(props.tabStyle);
    setActiveTab(props.activeTab);
    return <DefaultTabBar {...props} />;
  };

  const pickDateHandler = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShow(false);
    setGetMonth(monthNames[selected.getMonth()]);
    setGetDate(selected.getDate());
    setSelectedDay(dayNames[selected.getDay()]);

    // const month = selected.getMonth();
    // const date = selected.getDate();
    console.log(selected.getMonth());
    setSelectedDate(currentDate);
    setSelectedDay(dayNames[currentDate.getDay()]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headSection}>
        <View style={styles.left}>
          <Text style={styles.title}>My Class</Text>
          <Text style={styles.today}>
            {selectedDay}, {getMonth} {getDate}
          </Text>
        </View>
        {activeTab && activeTab === 1 ? (
          <Icon
            name="calendar-outline"
            onPress={() => {
              setShow(true);
              setMode('date');
            }}
          />
        ) : null}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={pickDateHandler}
          />
        )}
      </View>

      <Tabs tabContainerStyle={{elevation: 0}} renderTabBar={renderTabBar}>
        <Tab
          heading="All Schedule"
          textStyle={{color: '#ADA9BB'}}
          activeTextStyle={{color: '#5784BA'}}
          tabStyle={{backgroundColor: '#F9F9F9', borderWidth: 0}}
          activeTabStyle={{backgroundColor: '#F9F9F9'}}>
          <AllSchedule />
        </Tab>
        <Tab
          heading="For You"
          textStyle={{color: '#ADA9BB'}}
          activeTextStyle={{color: '#5784BA'}}
          tabStyle={{backgroundColor: '#F9F9F9', borderWidth: 0}}
          activeTabStyle={{backgroundColor: '#F9F9F9'}}>
          <ForYou day={selectedDay} />
        </Tab>
      </Tabs>
    </View>
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
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4D505B',
  },
});
export default Student;
