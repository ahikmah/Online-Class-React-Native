/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import axios from 'axios';
import {Tab, Tabs, DefaultTabBar, Button, Icon} from 'native-base';
import ProgressModal from '../ClassDetail/ProgressModal';
import {ProgressBar} from 'react-native-paper';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';
function Facilitator(props) {
  const [courseDetail, setCourseDetail] = useState();
  const [courseMember, setCourseMember] = useState();
  const [showModal, setShowModal] = useState(false);
  const [memberData, setMemberData] = useState();
  let progressItems;
  const {...data} = props.data;
  console.log('fas', data);
  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/courses/detail/${data.course_id}`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => {
        setCourseDetail(res.data.result[0]);
      })
      .catch(err => console.log(err));
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/instructor/course-member/${data.course_id}`,
        {
          headers: {'x-access-token': `Bearer ${token}`},
        },
      )
      .then(res => {
        setCourseMember(res.data.result);
      })
      .catch(err => console.log(err));
  }, []);
  const setColor = score => {
    if (courseMember) {
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
  if (courseMember) {
    progressItems = courseMember.map(item => {
      console.log(item);
      return (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            marginBottom: 12,
          }}>
          {item.avatar ? (
            <Image
              style={styles.avatar}
              source={{uri: `${DOMAIN_API}:${PORT_API}${item.avatar}`}}
            />
          ) : (
            <Image
              source={require('../../assets/images/graduate.png')}
              style={styles.avatar}
            />
          )}
          <View style={{justifyContent: 'flex-start', width: '80%'}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 13,
                textAlign: 'left',
                marginLeft: 12,
              }}
              onPress={() => {
                setShowModal(true);
                setMemberData({member_id: item.id, avatar_uri: item.avatar});
              }}>
              {item.full_name ?? item.username}
            </Text>
          </View>
          <Icon
            name="chevron-forward"
            onPress={() => {
              setShowModal(true);
              setMemberData({member_id: item.id, avatar_uri: item.avatar});
            }}
          />
        </View>
      );
    });
  }
  const renderTabBar = prop => {
    prop.tabStyle = Object.create(prop.tabStyle);
    return <DefaultTabBar {...prop} />;
  };

  return (
    <View style={styles.container}>
      {showModal ? (
        <ProgressModal
          data={{
            course_id: data.course_id,
            member_id: memberData.member_id,
            avatar: memberData.avatar_uri,
          }}
          modalVisible={showModal}
          onClose={() => setShowModal(false)}
        />
      ) : null}
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
          <Text style={{fontSize: 12}}>
            Level: {courseDetail && courseDetail.level}
          </Text>
          <Text style={{fontSize: 12}}>
            Category: {courseDetail && courseDetail.category}
          </Text>
          <Text style={{fontSize: 12}}>
            Price: {courseDetail && courseDetail.price}
          </Text>
        </View>

        {courseDetail ? (
          <>
            <View
              style={{position: 'absolute', width: '60%', top: 210, left: 127}}>
              <Text style={{color: '#5784BA', fontFamily: 'Montserrat-Medium'}}>
                {courseDetail.progress_in_percent}% to complete
              </Text>
              <ProgressBar
                progress={courseDetail.progress_in_percent / 100}
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
          textStyle={{color: '#ADA9BB', fontSize: 12}}
          activeTextStyle={{
            color: '#5784BA',
            fontSize: 12,
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
          textStyle={{color: '#ADA9BB', fontSize: 12}}
          activeTextStyle={{color: '#5784BA', fontSize: 12}}
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
            ) : (
              <Text style={styles.notFound}>Nothing here</Text>
            )}
          </View>
        </Tab>
        <Tab
          heading="Class Discussion"
          textStyle={{color: '#ADA9BB', fontSize: 12}}
          activeTextStyle={{color: '#5784BA', fontSize: 12}}
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
        <Tab
          heading="Member"
          textStyle={{color: '#ADA9BB', fontSize: 12}}
          activeTextStyle={{color: '#5784BA', fontSize: 12}}
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
            {/* <Text style={styles.notFound}>
              This screen is amazing, but the world isn't ready for it
            </Text> */}
            {progressItems}
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
    justifyContent: 'space-evenly',
    width: '70%',
    top: -170,
    left: 115,
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
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
  },
});
const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(Facilitator);
