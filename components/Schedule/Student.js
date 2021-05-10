/* eslint-disable react-native/no-inline-styles */
import {Icon} from 'native-base';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Tab, Tabs, DefaultTabBar} from 'native-base';
import AllSchedule from './AllSchedule';
import ForYou from './ForYou';
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

let curr = new Date();

let monthName = monthNames[curr.getMonth()];
// let dayName = dayNames[curr.getDay()]
let dt = curr.getDate();

const renderTabBar = props => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

function Student() {
  return (
    <View style={styles.container}>
      <View style={styles.headSection}>
        <View style={styles.left}>
          <Text style={styles.title}>My Class</Text>
          <Text style={styles.today}>
            Today, {monthName} {dt}
          </Text>
        </View>
        <Icon name="calendar-outline" />
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
          <ForYou />
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
