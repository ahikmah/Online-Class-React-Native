/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button, Icon} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import CustomModal from '../CustomModal';
import axios from 'axios';
import {DOMAIN_API, PORT_API} from '@env';
import {connect} from 'react-redux';

function Facilitator({...props}) {
  const [myClass, setMyClass] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState();
  const [memberCount, setMemberCount] = useState();
  const scrollRef = useRef();

  const getMyClass = () => {
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/instructor/my-course?pages=${currPage}`,
        {
          headers: {'x-access-token': `Bearer ${token}`},
        },
      )
      .then(res => {
        setMyClass([...myClass, ...res.data.result]);
        setCurrPage(res.data.info.page);
        setTotalPage(res.data.info.totalPage);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    const token = props.token;
    axios
      .get(
        `${DOMAIN_API}:${PORT_API}/data/instructor/my-course?pages=${currPage}`,
        {
          headers: {'x-access-token': `Bearer ${token}`},
        },
      )
      .then(res => {
        setMyClass([...myClass, ...res.data.result]);
        setCurrPage(res.data.info.page);
        setTotalPage(res.data.info.totalPage);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const token = props.token;
    axios
      .get(`${DOMAIN_API}:${PORT_API}/data/instructor/my-course`, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .then(res => {
        setMyClass(res.data.result);
        setCurrPage(res.data.info.page);
        setTotalPage(res.data.info.totalPage);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  useEffect(() => {
    getMyClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  const deleteHandler = e => {
    console.log(selectedCourseId);
    e.preventDefault();
    axios
      .delete(`${DOMAIN_API}:${PORT_API}/data/courses/${selectedCourseId}`, {
        headers: {'x-access-token': `Bearer ${props.token}`},
      })
      .then(res => {
        // console.log('Success', res);
        setShowModalDelete(false);
        setIsDeleted(!isDeleted);
        // history.go(0);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderHiddenItem = data => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() =>
          props.navigation.navigate('EditMyClass', {...data.item})
        }>
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          setShowModalDelete(true);
          setSelectedCourseId(data.item.course_id);
          setMemberCount(data.item.num_of_student);
        }}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <View style={styles.container}>
        {/* <Text style={styles.section}>My class</Text> */}
        <View style={styles.heading}>
          <Text style={{...styles.headtext, ...styles.name}}>Class Name</Text>
          <Text style={{...styles.headtext, ...styles.student}}>Students</Text>
        </View>

        {myClass ? (
          <SwipeListView
            listViewRef={scrollRef}
            data={myClass}
            keyExtractor={(_, index) => {
              return index.toString();
            }}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            // previewRowKey={'0'}
            // previewOpenValue={-40}
            // previewOpenDelay={3000}
            // onRowDidOpen={onRowDidOpen}
            renderItem={({item}) => {
              return (
                <View style={styles.myClassItem}>
                  <Text
                    style={styles.tbClassName}
                    onPress={() =>
                      props.navigation.navigate('ClassDetail', {
                        ...item,
                      })
                    }>
                    {item.course_name}
                  </Text>
                  <View style={styles.tbStudent}>
                    <Text style={{fontSize: 16}}>{item.num_of_student}</Text>
                    <Icon
                      style={{fontSize: 20, marginLeft: 3}}
                      name="school-sharp"
                    />
                  </View>
                  <Icon
                    name="chevron-forward"
                    style={{
                      position: 'absolute',
                      right: 10,
                      color: 'black',
                      fontSize: 24,
                    }}
                  />
                </View>
              );
            }}
            ListFooterComponent={
              currPage < totalPage ? (
                <View style={styles.loadMore}>
                  <Button
                    style={styles.btnLoadMore}
                    onPress={() => {
                      setCurrPage(currPage + 1);
                    }}>
                    <Text style={{color: 'white', fontFamily: 'Roboto-Medium'}}>
                      Load More
                    </Text>
                  </Button>
                </View>
              ) : null
            }
          />
        ) : null}
        {currPage > 2 ? (
          <View>
            <Button
              style={styles.btnBackToTop}
              onPress={() =>
                scrollRef.current.scrollToOffset({
                  animated: true,
                  offset: 0,
                })
              }>
              <Icon name="arrow-up" style={{textAlign: 'center'}} />
            </Button>
          </View>
        ) : null}

        {showModalDelete && !memberCount ? (
          <CustomModal
            iconStyle="confirm-danger"
            modalVisible={showModalDelete}
            title="Confirmation"
            msg="Are you sure want to delete this class?"
            btnLabel3="Cancel"
            onAction3={() => {
              setShowModalDelete(false);
            }}
            btnLabel4="Yes I'm sure"
            onAction4={deleteHandler}
          />
        ) : showModalDelete && memberCount ? (
          <CustomModal
            iconStyle="confirm-danger"
            modalVisible={showModalDelete}
            title="Forbidden ⚠"
            msg="You cannot delete a class that has members 👩‍🎓👨‍🎓"
            btnLabel="OK. I Understand"
            onAction={() => {
              setShowModalDelete(false);
            }}
          />
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    height: Dimensions.get('window').height,
    paddingBottom: 150,
  },
  section: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  heading: {
    flexDirection: 'row',
    marginBottom: 17,
    paddingHorizontal: 5,
  },
  headtext: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginTop: 16,
  },
  name: {
    width: Dimensions.get('window').width / 1.8,
  },
  student: {
    width: Dimensions.get('window').width / 3,
  },
  myClassItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    height: 60,
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  newClassItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    borderRadius: 5,
    padding: 10,
    height: 65,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tbClassName: {
    width: Dimensions.get('window').width / 1.8,
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
  },
  tbStudent: {
    width: Dimensions.get('window').width / 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  btnLoadMore: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#5784BA',
  },
  btnBackToTop: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#5784BA',
    zIndex: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  backTextWhite: {
    color: '#FFF',
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: '#E6EDF6',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#57BA61',
    left: 0,
    marginBottom: 1,
    borderRadius: 5,
    // padding: 10,
    height: 60,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    marginBottom: 1,
    borderRadius: 5,
    // padding: 10,
    height: 60,
  },
});

const mapStateToProps = state => ({
  token: state.auth.resultLogin.token,
});
export default connect(mapStateToProps)(Facilitator);
