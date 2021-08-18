/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfoAction, setIsAccepting} from '../../../redux/actions';
import {InnerWrapper} from '../../../components';
import constants from '../../../theme/constants';
import {withTheme, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Profile = ({theme, height, ...props}) => {
  const {async, collections} = constants;
  const VendorRef = firestore()
    .collection(collections.Vendors)
    .doc(props.user.uid);

  const VendorQueueRef = firestore()
    .collection(collections.Queues)
    .doc(props.user.uid);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const logout = async () => {
    await AsyncStorage.removeItem(async.user);
    props.setUserInfoAction({userType: 'none'});
  };

  const startAccepting = async () => {
    setLoading1(true);
    await VendorQueueRef.get()
      .then(async Queue => {
        if (!Queue.exists) {
          await VendorQueueRef.set({
            currentNum: 0,
            queue: [],
            totalEnrollment: 0,
            vendor: firestore().doc(`Vendors/${props.user.uid}`),
            hasStarted: false,
          })
            .then()
            .catch();
        }
        await VendorRef.update({isAccepting: true})
          .then(async () => {
            try {
              props.setIsAccepting({isAccepting: true});
              const userInfo = await AsyncStorage.getItem(async.user);
              await AsyncStorage.setItem(
                async.user,
                JSON.stringify({...JSON.parse(userInfo), isAccepting: true}),
              );
            } catch (error) {}
          })
          .catch();
        setLoading1(false);
      })
      .catch();
  };

  const stopAccepting = async () => {
    setLoading2(true);
    await VendorRef.update({isAccepting: false})
      .then(async () => {
        try {
          props.setIsAccepting({isAccepting: false});
          const userInfo = await AsyncStorage.getItem(async.user);
          await AsyncStorage.setItem(
            async.user,
            JSON.stringify({...JSON.parse(userInfo), isAccepting: false}),
          );
          setLoading2(false);
        } catch (error) {}
      })
      .catch();
  };

  return (
    <InnerWrapper>
      <Button onPress={logout} mode="contained" style={{marginBottom: 20}}>
        logout
      </Button>
      <Button
        onPress={startAccepting}
        style={{marginBottom: 20}}
        mode="contained"
        disabled={loading1 || props.user.isAccepting}
        loading={loading1}>
        {loading1 ? '' : 'Start Accepting'}
      </Button>
      <Button
        onPress={stopAccepting}
        mode="contained"
        disabled={loading2 || !props.user.isAccepting}
        loading={loading2}>
        {loading2 ? '' : 'Stop Accepting'}
      </Button>
    </InnerWrapper>
  );
};

const mapStateToProps = state => ({
  height: state.HeightReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, {setUserInfoAction, setIsAccepting})(
  withTheme(Profile),
);
