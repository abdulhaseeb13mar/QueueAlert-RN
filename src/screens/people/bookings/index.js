/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {InnerWrapper} from '../../../components';
import constants from '../../../theme/constants';
import {withTheme, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {showSnackbar} from '../../../utils/helpers';
import {useFocusEffect} from '@react-navigation/native';
import {setCurrentScreen} from '../../../redux/actions';

const Bookings = ({theme, height, ...props}) => {
  const {collections, snackbarType} = constants;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const userRef = firestore()
    .collection(collections.People)
    .doc(props.user.uid);

  const QueueCollection = firestore().collection(collections.Queues);

  useEffect(() => {
    getUserBookings();
  }, []);

  useFocusEffect(
    useCallback(() => {
      props.setCurrentScreen(constants.appScreens.Bookings);
    }, []),
  );

  const getUserBookings = async () => {
    setLoading(true);
    await userRef
      .get()
      .then(async userInfo => {
        if (!userInfo.exists) {
          return Promise.reject('User does not exist');
        }
        let bookingArr = Object.values(userInfo.data().Booking);
        let shouldDatabaseUpdate = false;
        let updatedBookings = {};
        for (let i = 0; i < bookingArr.length; i++) {
          let thisBooking = bookingArr[i];
          await QueueCollection.doc(thisBooking.queueId)
            .get()
            .then(queueInfo => {
              const userBookingInfo = queueInfo.data()?.queue[props.user.uid];
              if (!queueInfo.exists || !userBookingInfo) {
                shouldDatabaseUpdate = true;
              } else if (userBookingInfo.number !== thisBooking.number) {
                shouldDatabaseUpdate = true;
                updatedBookings[thisBooking.queueId] = {
                  ...thisBooking,
                  number: userBookingInfo.number,
                };
              } else {
                updatedBookings[thisBooking.queueId] = {...thisBooking};
              }
            });
        }
        if (shouldDatabaseUpdate) {
          setBookings(Object.values(updatedBookings));
          await userRef.update({Booking: updatedBookings});
        } else {
          setBookings(bookingArr);
        }
      })
      .catch(err => showSnackbar(err, snackbarType.SNACKBAR_ERROR));
    setLoading(false);
  };

  const refresh = () => getUserBookings();

  // const StyleProp = {colors: theme.colors, height};
  return (
    <InnerWrapper>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginVertical: 20,
        }}>
        <Text style={{fontWeight: 'bold'}}>Queue</Text>
        <Text style={{fontWeight: 'bold'}}>Number</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : bookings.length === 0 ? (
        <View>
          <Text>You have 0 bookings</Text>
        </View>
      ) : (
        bookings.map((singleBooking, index) => (
          <View
            key={index}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginVertical: 10,
            }}>
            <Text>{singleBooking.name}</Text>
            <Text>{singleBooking.number}</Text>
          </View>
        ))
      )}
      <Button mode="contained" onPress={refresh} style={{marginTop: 40}}>
        Refresh Bookings
      </Button>
    </InnerWrapper>
  );
};

// const styles = ({colors, height}) => StyleSheet.create({});

const mapStateToProps = state => ({
  height: state.HeightReducer,
  user: state.userReducer,
  currentScreen: state.ScreenReducer,
});

export default connect(mapStateToProps, {setCurrentScreen})(
  withTheme(Bookings),
);
