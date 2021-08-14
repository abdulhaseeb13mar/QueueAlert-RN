/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, BackHandler} from 'react-native';
import {connect} from 'react-redux';
// import styles from './style';
import firestore from '@react-native-firebase/firestore';
import {setUserInfoAction, setCurrentScreen} from '../../../redux/actions';
import {withTheme} from 'react-native-paper';
import constants from '../../../theme/constants';
import {InnerWrapper} from '../../../components';
import navigator from '../../../utils/navigator';

const SingleVendor = ({theme, height, ...props}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [allQueue, setAllQueue] = useState([]);

  const {collections, appScreens} = constants;

  // const StyleProp = {colors: theme.colors, height};

  const singleVendor = props.route.params;

  useEffect(() => {
    const subscriber = firestore()
      .collection(collections.Queues)
      .doc(singleVendor.uid)
      .onSnapshot(documentSnapshot => {
        setCurrentNumber(
          documentSnapshot.data() ? documentSnapshot.data().currentNum : null,
        );
      });
    getQueueOfVendor();
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

  const getQueueOfVendor = async () => {
    await firestore()
      .collection(collections.Queues)
      .doc(singleVendor.uid)
      .collection(collections.Queue)
      .get()
      .then(collection => {
        setAllQueue(collection.docs.map(doc => doc.data()));
      })
      .catch(e => console.log(e));
  };

  return (
    <InnerWrapper>
      {console.log('---------', allQueue)}
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
    </InnerWrapper>
  );
};
const mapStateToProps = state => ({
  height: state.HeightReducer,
});
export default connect(mapStateToProps, {setUserInfoAction, setCurrentScreen})(
  withTheme(SingleVendor),
);
