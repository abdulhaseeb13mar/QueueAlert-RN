/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {setUserInfoAction, setCurrentScreen} from '../../../redux/actions';
import constants from '../../../theme/constants';
import {FlatList, InnerWrapper, VendorTile} from '../../../components';
import {withTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigator from '../../../utils/navigator';
import {useFocusEffect} from '@react-navigation/native';

const HomePage = ({theme, height, ...props}) => {
  useEffect(() => {
    getAllVendors();
  }, []);

  useFocusEffect(
    useCallback(() => {
      props.setCurrentScreen(constants.appScreens.Home);
    }, []),
  );

  const {colors} = theme;
  const StyleProp = {colors, height};

  const [allVendors, setAllVendors] = useState([]);

  const getAllVendors = async () => {
    let allVends;
    // let asyncVendors = await getFromAsyncVendors();
    await firestore()
      .collection(constants.collections.Vendors)
      .get()
      .then(collection => {
        allVends = collection.docs.map(doc => doc.data());
        setAllVendors(allVends);
      })
      .catch(e => console.log(e));
  };

  // const getFromAsyncVendors = async () => {
  //   try {
  //     const vendorList = await AsyncStorage.getItem(
  //       constants.async.vendorsList,
  //     );
  //     vendorList != null && setAllVendors(vendorList);
  //     return vendorList;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleCardPress = item => {
    navigator.navigate(constants.appScreens.SingleVendor, item);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(constants.async.user);
    props.setUserInfoAction({userType: 'none'});
  };

  return (
    <InnerWrapper>
      <Button onPress={logout}>logout</Button>
      <View style={styles(StyleProp).searchView}>
        <TextInput
          mode="flat"
          style={styles(StyleProp).searchInput}
          left={
            <TextInput.Icon
              name={() => (
                <Ionicons name="search" color={colors.border} size={19} />
              )}
            />
          }
          underlineColor="none"
          placeholderTextColor={colors.border}
          label=""
          returnKeyType="search"
          placeholder="Search"
          selectionColor={colors.selection}
          theme={{
            colors: {
              primary: 'transparent',
              underlineColor: 'transparent',
            },
          }}
        />
      </View>
      {allVendors.length > 0 && (
        <View style={styles(StyleProp).listContainer}>
          <FlatList
            data={allVendors}
            renderItem={({item}) => (
              <VendorTile item={item} onPress={handleCardPress} />
            )}
            horizontal={false}
            numColumns={2}
            style={styles(StyleProp).flatlistStyle}
          />
        </View>
      )}
    </InnerWrapper>
  );
};

const mapStateToProps = state => ({
  height: state.HeightReducer,
  currentScreen: state.ScreenReducer,
});

export default connect(mapStateToProps, {setUserInfoAction, setCurrentScreen})(
  withTheme(HomePage),
);
