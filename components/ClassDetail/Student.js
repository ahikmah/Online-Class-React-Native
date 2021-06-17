/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import axios from 'axios';
import {Tab, Tabs, DefaultTabBar, Button} from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import {ProgressBar} from 'react-native-paper';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';
function Student(props) {
  const [courseDetail, setCourseDetail] = useState();
  const [myProgress, setMyProgress] = useState();
  let progressItems;
  const {...data} = props.data;

  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/courses/detail/${data.id}`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => {
        setCourseDetail(res.data.result[0]);
      })
      .catch(err => console.log(err));
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/student/my-progress/${data.id}`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => {
        setMyProgress(res.data.result);
      })
      .catch(err => console.log(err));
  }, []);
  const setColor = score => {
    if (myProgress) {
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
  if (myProgress) {
    progressItems = myProgress.map(item => {
      return (
        <View
          key={item.chapter_name}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 50,
            borderBottomWidth: 0.5,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
            <CheckBox
              value={item.score === 'Unfinished' ? false : true}
              onFillColor="#5784BA"
              tintColors="#5784BA"
              disabled={true}
            />
            <Text
              style={{
                marginLeft: 10,
                textAlign: 'left',
                fontFamily: 'Montserrat-Medium',
                fontSize: 13,
              }}>
              {item.chapter_name}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              textAlign: 'center',
              width: '30%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={
                item.score !== 'Unfinished'
                  ? {...styles.statusScore, color: setColor(item.score)}
                  : styles.unfinished
              }>
              {item.score}
            </Text>
          </View>
        </View>
      );
    });
  }
  const renderTabBar = prop => {
    prop.tabStyle = Object.create(prop.tabStyle);
    return <DefaultTabBar {...prop} />;
  };

  const register =
    data.status || data.isRegistered ? (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: 40,
          color: setColor(data.score),
        }}>
        {data.score}
      </Text>
    ) : (
      <Button
        style={{backgroundColor: '#57BA61', borderRadius: 12, height: 'auto'}}>
        <Text
          style={{
            color: 'white',
            paddingHorizontal: 9,
            fontFamily: 'Roboto-Medium',
          }}>
          Register
        </Text>
      </Button>
    );

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../assets/images/banner-course.png')}
          style={{width: '100%', top: -15}}
        />
        <Image
          source={require('../../assets/images/thumbnail-course.png')}
          style={{top: -90, left: 16}}
        />
        <Text style={styles.title}>
          {data.course_name
            ? data.course_name.length < 25
              ? data.course_name
              : data.course_name.slice(0, 25) + '...'
            : null || data.name
            ? data.name.length < 25
              ? data.name
              : data.name.slice(0, 25) + '...'
            : null}
        </Text>
        <View style={styles.detail}>
          <Text style={{fontSize: 12, marginRight: 5}}>
            Level: {courseDetail && courseDetail.level}
          </Text>
          <Text style={{fontSize: 12, marginRight: 5}}>
            Category: {courseDetail && courseDetail.category}
          </Text>
          <Text style={{fontSize: 12}}>
            Price: {courseDetail && courseDetail.price}
          </Text>
        </View>
        <View style={{position: 'absolute', right: 15, top: 15}}>
          {register}
        </View>

        {data.status ? (
          <>
            <View
              style={{position: 'absolute', width: '60%', top: 210, left: 127}}>
              <Text style={{color: '#5784BA', fontFamily: 'Montserrat-Medium'}}>
                {data.progress_in_percent}% to complete
              </Text>
              <ProgressBar
                progress={data.progress_in_percent / 100}
                color="#5784BA"
              />
            </View>
          </>
        ) : null}
      </View>
      <Tabs
        tabContainerStyle={{elevation: 0, marginBottom: -10}}
        style={styles.tab}
        renderTabBar={renderTabBar}>
        <Tab
          heading="Information"
          textStyle={{color: '#ADA9BB', fontSize: 14}}
          activeTextStyle={{
            color: '#5784BA',
            fontSize: 14,
          }}
          tabStyle={{
            backgroundColor: 'white',
          }}
          activeTabStyle={{
            backgroundColor: 'white',
            borderBottomWidth: 2,
            borderBottomColor: '#5784BA',
          }}>
          <View style={{paddingHorizontal: 30}}>
            <Text style={styles.infoTitle}>Description</Text>
            <Text style={styles.infoDetail}>
              {courseDetail && `\n${courseDetail.description}`}
            </Text>
            <Text style={styles.infoTitle}>What will I learn</Text>
            <Text style={styles.infoDetail}>
              {courseDetail && courseDetail.objectives
                ? courseDetail.objectives
                    .split('#')
                    .map(item => (
                      <Text key={item}>
                        {item ? `\n \u2022 ${item}` : null}
                      </Text>
                    ))
                : null}
            </Text>
            <Text style={styles.infoTitle}>Requirements</Text>
            <Text style={styles.infoDetail}>
              {courseDetail && courseDetail.requirements
                ? courseDetail.requirements
                    .split('#')
                    .map(item => (
                      <Text key={item}>
                        {item ? `\n \u2022 ${item}` : null}
                      </Text>
                    ))
                : null}
            </Text>
          </View>
        </Tab>
        <Tab
          heading="Class Progress"
          textStyle={{color: '#ADA9BB', fontSize: 14}}
          activeTextStyle={{color: '#5784BA', fontSize: 14}}
          tabStyle={{
            backgroundColor: 'white',
          }}
          activeTabStyle={{
            backgroundColor: 'white',
            borderBottomWidth: 2,
            borderBottomColor: '#5784BA',
          }}>
          <View style={{paddingHorizontal: 30}}>
            {data.status ? (
              progressItems
            ) : !data.status && data.isRegistered ? (
              <Text style={styles.notFound}>This class hasn't started yet</Text>
            ) : (
              <Text style={styles.notFound}>
                You're not member of this class
              </Text>
            )}
          </View>
        </Tab>
        <Tab
          heading="Class Discussion"
          textStyle={{color: '#ADA9BB', fontSize: 14}}
          activeTextStyle={{color: '#5784BA', fontSize: 14}}
          tabStyle={{
            backgroundColor: 'white',
          }}
          activeTabStyle={{
            backgroundColor: 'white',
            borderBottomWidth: 2,
            borderBottomColor: '#5784BA',
          }}>
          {/* <ForYou /> */}
          <View style={{paddingHorizontal: 50}}>
            <Text style={styles.notFound}>
              This screen is amazing, but the world isn't ready for it
            </Text>
          </View>
        </Tab>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white'},
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
    top: -180,
    left: 124,
  },
  detail: {
    flexDirection: 'row',
    width: '60%',
    top: -180,
    left: 125,
    flexWrap: 'wrap',
  },
  tab: {
    top: -120,
    left: -10,
  },
  infoTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginTop: 15,
  },
  infoDetail: {
    fontFamily: 'Roboto-Reagular',
    fontSize: 13,
    marginTop: -10,
  },
  statusScore: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  unfinished: {
    backgroundColor: '#EDD2D2',
    color: '#BA5757',
    borderRadius: 10,
    fontSize: 12,
    padding: 5,
  },
  notFound: {
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    color: '#BA5757',
    backgroundColor: '#EDD2D2',
    padding: 3,
    borderRadius: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
});
const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(Student);
