/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {InnerWrapper} from '../../../components';
import constants from '../../../theme/constants';
import {withTheme} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {showSnackbar} from '../../../utils/helpers';

const Bookings = ({theme, height, ...props}) => {
  const {collections, appScreens, snackbarType} = constants;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const userRef = firestore()
    .collection(collections.People)
    .doc(props.user.uid);

  useEffect(() => {
    getUserBookings();
  }, []);

  const getUserBookings = async () => {
    setLoading(true);
    await userRef
      .get()
      .then(userInfo => {
        if (!userInfo.exists) {
          return Promise.reject('User does not exist');
        }
        setBookings(Object.values(userInfo.data().Booking));
      })
      .catch(err => showSnackbar(err, snackbarType.SNACKBAR_ERROR));
    setLoading(false);
  };

  const StyleProp = {colors: theme.colors, height};
  return (
    <InnerWrapper>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginVertical: 20,
          // borderWidth: 2,
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
    </InnerWrapper>
  );
};

const styles = ({colors, height}) => StyleSheet.create({});

const mapStateToProps = state => ({
  height: state.HeightReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, {})(withTheme(Bookings));
