import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Icon, Input, Item} from 'native-base';
import {connect} from 'react-redux';
import StudentClassDetail from '../components/ClassDetail/Student';
import FacilitatorClassDetail from '../components/ClassDetail/Facilitator';
function ClassDetail({...props}) {
  const role = props.role;
  const {...course} = props.route.params;
  console.log(course);
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topSection}>
            <Icon
              name="chevron-back"
              style={{color: 'white', fontSize: 32}}
              onPress={() => props.navigation.goBack()}
            />
            <Text
              style={styles.title}
              onPress={() => props.navigation.goBack()}>
              {course.course_name || course.name}
            </Text>
          </View>
        </View>
        <ScrollView>
          {role === 'student' ? (
            <StudentClassDetail
              navigation={props.navigation}
              data={props.route.params}
            />
          ) : (
            <FacilitatorClassDetail
              navigation={props.navigation}
              data={props.route.params}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6EDF6',
    // flex: 1,
  },
  header: {
    paddingTop: StatusBar.currentHeight + 12 + (40 - StatusBar.currentHeight),
    backgroundColor: '#5784BA',
    paddingHorizontal: 26,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 25,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 22,
    color: 'white',
  },
});
const mapStateToProps = state => ({
  token: state.auth.result.token,
  role: state.auth.currentUser.role,
});
export default connect(mapStateToProps)(ClassDetail);
