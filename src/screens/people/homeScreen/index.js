/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {setUserInfoAction} from '../../../redux/actions';
import constants from '../../../theme/constants';
import {FlatList, WrapperScreen, VendorTile} from '../../../components';

const HomePage = props => {
  useEffect(() => {
    getAllVendors();
  }, []);

  const [allVendors, setAllVendors] = useState([]);

  const getAllVendors = async () => {
    let allVends;
    await firestore()
      .collection(constants.collections.Vendors)
      .get()
      .then(collection => {
        allVends = collection.docs.map(doc => doc.data());
        console.log(allVends);
        setAllVendors(allVends);
      })
      .catch(e => console.log(e));
  };

  const logout = async () => {
    await AsyncStorage.removeItem(constants.async.user);
    props.setUserInfoAction({userType: 'none'});
  };

  return (
    <WrapperScreen>
      <View style={styles.container}>
        {allVendors.length > 0 && (
          <FlatList
            data={allVendors}
            renderItem={({item}) => <VendorTile item={item} />}
            horizontal={false}
          />
        )}
      </View>
    </WrapperScreen>
  );
};

export default connect(null, {setUserInfoAction})(HomePage);
