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
import StudentMyClass from '../components/MyClass/Student';
import FacilitatorMyClass from '../components/MyClass/Facilitator';
import {connect} from 'react-redux';

function MyClass({...props}) {
  const role = props.role;
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
              onPress={() => props.navigation.navigate('ActivityDashboard')}
            />
            <Text
              style={styles.title}
              onPress={() => props.navigation.navigate('ActivityDashboard')}>
              My Class
            </Text>
          </View>
        </View>
        <View>
          {role === 'student' ? (
            <StudentMyClass navigation={props.navigation} />
          ) : (
            <FacilitatorMyClass navigation={props.navigation} />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6EDF6',
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    paddingTop: StatusBar.currentHeight + 12 + (40 - StatusBar.currentHeight),
    backgroundColor: '#5784BA',
    paddingHorizontal: 26,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 24,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 32,
    color: 'white',
  },
});
const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
  role: state.auth.currentUser.role,
});
export default connect(mapStateToProps)(MyClass);
