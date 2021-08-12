/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {setUserInfoAction} from '../../../redux/actions';
import constants from '../../../theme/constants';

const SingleVendor = props => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const subscriber = firestore()
      .collection(constants.collections.Queues)
      .doc('JCMrwhxxa9a3TFt5LH2EUcWPBjp1')
      .onSnapshot(documentSnapshot => {
        console.log('Current Number: ', documentSnapshot.data());
        setCurrentNumber(documentSnapshot.data().currentNum);
      });
    return () => subscriber();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem(constants.async.user);
    props.setUserInfoAction({userType: 'none'});
  };

  return (
    <View style={styles.container}>
      <Text>Single Vendor Screen</Text>
      <Text>ABDUL HASEEB QUEUE ONGOING...</Text>
      <Text style={{fontSize: 100}}>
        {currentNumber < 10 ? `0${currentNumber}` : currentNumber}
      </Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

export default connect(null, {setUserInfoAction})(SingleVendor);
