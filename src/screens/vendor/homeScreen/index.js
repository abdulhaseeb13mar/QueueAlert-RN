/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Button, ActivityIndicator, ScrollView} from 'react-native';
import {InnerWrapper} from '../../../components';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import constants from '../../../theme/constants';
import {getAge} from '../../../utils/helpers';
import {
  incrementNumberAction,
  setCurrentNumberAction,
  decrementNumberAction,
  setUserInfoAction,
  setQueue,
} from '../../../redux/actions';

const HomePage = props => {
  const {async, collections} = constants;

  const VendorRef = firestore()
    .collection(collections.Queues)
    .doc(props.user.uid);

  const singleQueueRef = VendorRef.collection(collections.Queue);

  useEffect(() => {
    getCurrentNum();
    const subscriber = singleQueueRef.onSnapshot(documentSnapshot =>
      props.setQueue(documentSnapshot.docs.map(doc => doc.data())),
    );
    return () => subscriber();
  }, []);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [personInfo, setPersonInfo] = useState(null);

  const endQueue = async () => {
    setLoading4(true);
    await VendorRef.delete()
      .then(async () => {
        try {
          await AsyncStorage.removeItem(async.currentNum);
          props.setCurrentNumberAction(0);
          setLoading4(false);
        } catch (e) {
          // saving error
        }
      })
      .catch();
  };

  const decrementQueue = async () => {
    setLoading3(true);
    await VendorRef.update({currentNum: props.currentNumber - 1})
      .then(async () => {
        props.decrementNumberAction(props.currentNumber);
        saveCurrentNum(props.currentNumber - 1);
        setLoading3(false);
      })
      .catch();
  };

  const getCurrentNum = async () => {
    try {
      const value = await AsyncStorage.getItem(async.currentNum);
      if (value !== null) {
        props.setCurrentNumberAction(parseInt(value, 10));
        console.log(value);
      }
      await VendorRef.get()
        .then(async doc => {
          if (
            doc.exists &&
            value !== null &&
            doc.data().currentNum.toString() !== value
          ) {
            console.log(
              'db main tha aur local main bhi tha lekin value different thi',
            );
            props.setCurrentNumberAction(doc.data().currentNum);
            await saveCurrentNum(doc.data().currentNum);
          } else if (!doc.exists) {
            console.log('db main he nae tha');
            props.setCurrentNumberAction(0);
          } else if (value == null && doc.exists) {
            console.log('local main nae tha lekin db main tha');
            props.setCurrentNumberAction(doc.data().currentNum);
            await saveCurrentNum(doc.data().currentNum);
          }
        })
        .catch();
    } catch (e) {
      // error reading value
    }
  };

  const saveCurrentNum = async num => {
    try {
      await AsyncStorage.setItem(async.currentNum, num.toString());
    } catch (e) {
      // saving error
    }
  };

  const incrementQueue = async () => {
    setLoading2(true);
    await VendorRef.update({currentNum: props.currentNumber + 1})
      .then(async () => {
        props.incrementNumberAction(props.currentNumber);
        saveCurrentNum(props.currentNumber + 1);
        setLoading2(false);
      })
      .catch();
  };

  const startQueue = async () => {
    setLoading1(true);
    await VendorRef.set({
      currentNum: 1,
      vendor: firestore().doc(`Vendors/${props.user.uid}`),
    })
      .then(async res => {
        props.incrementNumberAction(props.currentNumber);
        await saveCurrentNum(props.currentNumber + 1);
        setLoading1(false);
      })
      .catch();
  };

  useEffect(() => {
    let currentPerson = props.queue[props.currentNumber - 1];
    if (!currentPerson) {
      setPersonInfo(null);
      return;
    }
    if (currentPerson.number === props.currentNumber) {
      setPersonInfo(currentPerson);
    } else {
      for (let i = 0; i < props.queue.length; i++) {
        if (props.queue[i].number === props.currentNumber) {
          setPersonInfo(currentPerson);
          break;
        }
      }
    }
  }, [props.currentNumber]);
  return (
    <InnerWrapper>
      <ScrollView style={{width: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.currentNumText}>CURRENT NUMBER</Text>
          <Text style={styles.currentNumber}>
            {props.currentNumber < 10
              ? `0${props.currentNumber}`
              : props.currentNumber}
          </Text>
          <View style={styles.nextBackContainer}>
            {loading3 ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Button
                title="Back"
                disabled={props.currentNumber === 0 || loading2 === true}
                onPress={decrementQueue}
              />
            )}
            {loading2 ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Button
                title="Next"
                disabled={props.currentNumber === 0 || loading3 === true}
                onPress={incrementQueue}
              />
            )}
          </View>
          <View style={{marginTop: 20}}>
            {loading1 ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Button
                title="Start"
                onPress={startQueue}
                disabled={props.currentNumber !== 0}
              />
            )}
          </View>
          <View style={{marginTop: 20}}>
            {loading4 ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Button
                title="End"
                onPress={endQueue}
                disabled={props.currentNumber === 0}
              />
            )}
          </View>
          {personInfo ? (
            <View>
              <Text>NAME: {personInfo.name}</Text>
              <Text>
                AGE: {getAge(new Date(personInfo.dob.toDate()).toDateString())}
              </Text>
              <Text>GENDER: {personInfo.gender}</Text>
              <Text>EMAIL: {personInfo.email}</Text>
            </View>
          ) : (
            <Text>No User</Text>
          )}
        </View>
      </ScrollView>
    </InnerWrapper>
  );
};

const mapStateToProps = state => ({
  currentNumber: state.NummberReducer,
  user: state.userReducer,
  queue: state.QueueReducer,
});

export default connect(mapStateToProps, {
  incrementNumberAction,
  setCurrentNumberAction,
  decrementNumberAction,
  setUserInfoAction,
  setQueue,
})(HomePage);
