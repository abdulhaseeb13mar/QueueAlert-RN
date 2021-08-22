/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {InnerWrapper} from '../../../components';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import constants from '../../../theme/constants';
import {getAge, showSnackbar, SortQueue} from '../../../utils/helpers';
import {Button} from 'react-native-paper';
import {
  incrementNumberAction,
  setCurrentNumberAction,
  decrementNumberAction,
  setUserInfoAction,
  setQueue,
  setIsAccepting,
} from '../../../redux/actions';

const HomePage = props => {
  const {async, collections, snackbarType} = constants;

  const VendorQueueRef = firestore()
    .collection(collections.Queues)
    .doc(props.user.uid);

  const VendorRef = firestore()
    .collection(collections.Vendors)
    .doc(props.user.uid);

  useEffect(() => {
    const subscriber = VendorQueueRef.onSnapshot(async documentSnapshot => {
      let currentNum = await getCurrentNum();
      let queue = [];
      if (documentSnapshot.exists) {
        queue = SortQueue(Object.values(documentSnapshot.data().queue));
      }
      getUserInfo(queue, parseInt(currentNum, 10));
      props.setQueue(queue);
    });
    return () => subscriber();
  }, []);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [personInfo, setPersonInfo] = useState(null);

  const endQueue = async () => {
    setLoading4(true);
    await firestore()
      .runTransaction(transaction => {
        return transaction.get(VendorRef).then(VendorInfo => {
          if (!VendorInfo.exists) {
            return Promise.reject('Could not end The queue, vendor not found');
          }
          transaction.update(VendorRef, {
            isAccepting: false,
          });
          transaction.delete(VendorQueueRef);
          return Promise.resolve('Transaction completed');
        });
      })
      .then(async status => {
        try {
          await AsyncStorage.removeItem(async.currentNum);
          props.setIsAccepting({isAccepting: false});
          props.setCurrentNumberAction(0);
          const userInfo = await AsyncStorage.getItem(async.user);
          await AsyncStorage.setItem(
            async.user,
            JSON.stringify({...JSON.parse(userInfo), isAccepting: false}),
          );
          setLoading4(false);
        } catch (e) {
          // saving error
        }
      })
      .catch(error => console.log(error));
  };

  const decrementQueue = async () => {
    setLoading3(true);
    await VendorQueueRef.update({currentNum: props.currentNumber - 1})
      .then(async () => {
        props.decrementNumberAction(props.currentNumber);
        saveCurrentNum(props.currentNumber - 1);
        setLoading3(false);
      })
      .catch();
  };

  const getCurrentNum = async () => {
    let valueToreturn;
    try {
      const value = await AsyncStorage.getItem(async.currentNum);
      if (value !== null) {
        valueToreturn = value;
        props.setCurrentNumberAction(parseInt(value, 10));
      }
      await VendorQueueRef.get()
        .then(async doc => {
          if (
            doc.exists &&
            value !== null &&
            doc.data().currentNum.toString() !== value
          ) {
            console.log(
              'db main tha aur local main bhi tha lekin value different thi',
            );
            valueToreturn = doc.data().currentNum;
            props.setCurrentNumberAction(doc.data().currentNum);
            await saveCurrentNum(doc.data().currentNum);
          } else if (!doc.exists) {
            console.log('db main he nae tha');
            valueToreturn = 0;
            props.setCurrentNumberAction(0);
          } else if (value == null && doc.exists) {
            console.log('local main nae tha lekin db main tha');
            valueToreturn = doc.data().currentNum;
            props.setCurrentNumberAction(doc.data().currentNum);
            await saveCurrentNum(doc.data().currentNum);
          }
        })
        .catch();
    } catch (e) {
      // error reading value
    }
    return valueToreturn;
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
    await VendorQueueRef.update({currentNum: props.currentNumber + 1})
      .then(async () => {
        props.incrementNumberAction(props.currentNumber);
        saveCurrentNum(props.currentNumber + 1);
        setLoading2(false);
      })
      .catch();
  };

  const startQueue = async () => {
    setLoading3(true);
    await VendorRef.get()
      .then(async vendorInfo => {
        if (vendorInfo.data().isAccepting) {
          await VendorQueueRef.update({
            currentNum: 1,
          })
            .then(async res => {
              props.incrementNumberAction(props.currentNumber);
              await saveCurrentNum(props.currentNumber + 1);
              setLoading3(false);
            })
            .catch();
        } else {
          setLoading3(false);
          showSnackbar(
            'Vendor not accepting queue numbers',
            snackbarType.SNACKBAR_ERROR,
          );
        }
      })
      .catch();
  };

  useEffect(() => {
    getUserInfo(props.queue, props.currentNumber);
  }, [props.currentNumber]);

  const getUserInfo = (queue, currentNum) => {
    let currentPerson = queue[currentNum - 1];
    if (!currentPerson) {
      setPersonInfo(null);
      return;
    }
    if (currentPerson.number === currentNum) {
      setPersonInfo(currentPerson);
    } else {
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].number === currentNum) {
          setPersonInfo(currentPerson);
          break;
        }
      }
    }
  };

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
            <Button
              mode="contained"
              loading={loading1}
              disabled={props.currentNumber === 0 || loading2 || loading1}
              onPress={decrementQueue}>
              Back
            </Button>
            <Button
              mode="contained"
              loading={loading2}
              disabled={props.currentNumber === 0 || loading3 || loading2}
              onPress={incrementQueue}>
              Next
            </Button>
          </View>
          <View style={{marginTop: 20}}>
            <Button
              mode="contained"
              loading={loading3}
              onPress={startQueue}
              disabled={props.currentNumber !== 0 || loading3}>
              Start Queue
            </Button>
          </View>
          <View style={{marginTop: 20}}>
            <Button
              mode="contained"
              loading={loading4}
              onPress={endQueue}
              disabled={props.currentNumber === 0 || loading4}>
              End Queue
            </Button>
          </View>
          {personInfo ? (
            <View style={{marginTop: 50}}>
              <Text style={{marginBottom: 20, fontWeight: 'bold'}}>
                CURRENT USER INFO
              </Text>
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
  setIsAccepting,
})(HomePage);
