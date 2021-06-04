/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import firestore from '@react-native-firebase/firestore';

const HomePage = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Queues')
      .doc('ka8ivUqheDdJ1MEWvuPTKMIw8BQ2')
      .onSnapshot(documentSnapshot => {
        console.log('Current Number: ', documentSnapshot.data().currentNum);
        setCurrentNumber(documentSnapshot.data().currentNum);
      });
    return () => subscriber();
  }, []);
  return (
    <View style={styles.container}>
      <Text>People HomePage Screen</Text>
      <Text>ABDUL HASEEB QUEUE ONGOING...</Text>
      <Text style={{fontSize: 100}}>
        {currentNumber < 10 ? `0${currentNumber}` : currentNumber}
      </Text>
    </View>
  );
};

export default HomePage;
