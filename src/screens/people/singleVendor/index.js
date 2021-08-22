/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, BackHandler, View} from 'react-native';
import {connect} from 'react-redux';
// import styles from './style';
import firestore from '@react-native-firebase/firestore';
import {setUserInfoAction, setCurrentScreen} from '../../../redux/actions';
import {withTheme} from 'react-native-paper';
import constants from '../../../theme/constants';
import {InnerWrapper} from '../../../components';
import navigator from '../../../utils/navigator';
import {Button} from 'react-native-paper';
import {showSnackbar} from '../../../utils/helpers';
import SuccessfulAddedModal from '../../../components/modals/SuccessfulAdded';

const SingleVendor = ({theme, height, ...props}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [allQueue, setAllQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const {collections, appScreens, snackbarType} = constants;

  // const StyleProp = {colors: theme.colors, height};

  const singleVendor = props.route.params;

  const vendorQueueRef = firestore()
    .collection(collections.Queues)
    .doc(singleVendor.uid);

  const VendorRef = firestore()
    .collection(collections.Vendors)
    .doc(singleVendor.uid);

  const userRef = firestore()
    .collection(collections.People)
    .doc(props.user.uid);

  useEffect(() => {
    const subscriber = vendorQueueRef.onSnapshot(documentSnapshot => {
      setCurrentNumber(
        documentSnapshot.data() ? documentSnapshot.data().currentNum : null,
      );
    });
    // getQueueOfVendor();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigator.navigate(appScreens.Home);
        props.setCurrentScreen(appScreens.Home);
        return true;
      },
    );
    return () => {
      subscriber();
      backHandler.remove();
    };
  }, []);

  // const getQueueOfVendor = async () => {
  //   await vendorQueueRef
  //     .collection(collections.Queue)
  //     .get()
  //     .then(collection => {
  //       setAllQueue(collection.docs.map(doc => doc.data()));
  //     })
  //     .catch(e => console.log(e));
  // };

  const bookNumber = async () => {
    const {name, email, gender, number, dob, uid} = props.user;
    const data = {
      name,
      email,
      gender,
      cancelled: false,
      phone: number,
      dob: new Date(dob.toDate()),
      uid,
    };
    setLoading(true);
    await userRef
      .get()
      .then(async userInfo => {
        if (userInfo.exists) {
          const userBookings = userInfo.data().Booking;
          if (Object.keys(userBookings).length >= 2) {
            return Promise.reject('You cannot Book more than 2 bookings');
          } else {
            await vendorQueueRef
              .get()
              .then(async queueInfo => {
                if (queueInfo.exists) {
                  const queue = {...queueInfo.data().queue};
                  if (queue[props.user.uid] === undefined) {
                    //push the user
                    await VendorRef.get()
                      .then(async vendorInfo => {
                        if (vendorInfo.data().isAccepting) {
                          await firestore()
                            .runTransaction(transaction => {
                              return transaction
                                .get(vendorQueueRef)
                                .then(QueueInfo => {
                                  if (!QueueInfo.exists) {
                                    return Promise.reject(
                                      'Person was not added unfortunately',
                                    );
                                  }
                                  const totalEnrollments =
                                    QueueInfo.data().totalEnrollment;
                                  transaction.update(vendorQueueRef, {
                                    totalEnrollment: totalEnrollments + 1,
                                    [`queue.${props.user.uid}`]: {
                                      ...data,
                                      number: totalEnrollments + 1,
                                    },
                                  });
                                  return Promise.resolve(totalEnrollments + 1);
                                });
                            })
                            .then(queueNumber => {
                              setUserData({
                                name,
                                email,
                                phone: number,
                                dob,
                                number: queueNumber,
                                gender,
                              });
                            })
                            .catch(error => console.log(error));
                        } else {
                          showSnackbar(
                            'Vendor not accepting queue numbers',
                            snackbarType.SNACKBAR_ERROR,
                          );
                        }
                      })
                      .catch();
                  } else {
                    return Promise.reject(
                      'You already have booked in this queue',
                    );
                  }
                } else {
                  return Promise.reject('Queue does not exist');
                }
              })
              .catch(err => showSnackbar(err, snackbarType.SNACKBAR_ERROR));
          }
        } else {
          return Promise.reject('User does not exist');
        }
      })
      .catch(err => showSnackbar(err, snackbarType.SNACKBAR_ERROR));
    setLoading(false);
  };

  return (
    <InnerWrapper>
      {currentNumber ? (
        <Text style={{marginTop: 100, color: 'black', fontSize: 20}}>
          {singleVendor.name} QUEUE ONGOING...
        </Text>
      ) : (
        <Text style={{marginTop: 100, color: '#d0d0d0', fontSize: 20}}>
          {singleVendor.name} queue is not available
        </Text>
      )}
      <Text
        style={{fontSize: 100, color: !currentNumber ? '#d0d0d0' : 'black'}}>
        {!currentNumber
          ? '00'
          : currentNumber < 10
          ? `0${currentNumber}`
          : currentNumber}
      </Text>
      <View>
        <Button
          mode="contained"
          onPress={bookNumber}
          loading={loading}
          disabled={loading}>
          Book a Number
        </Button>
      </View>
      <SuccessfulAddedModal
        userData={userData}
        onClose={() => setUserData(null)}
      />
    </InnerWrapper>
  );
};
const mapStateToProps = state => ({
  height: state.HeightReducer,
  user: state.userReducer,
});
export default connect(mapStateToProps, {setUserInfoAction, setCurrentScreen})(
  withTheme(SingleVendor),
);
