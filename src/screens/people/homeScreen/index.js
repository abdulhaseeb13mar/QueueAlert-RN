import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {setUserInfoAction} from '../../../redux/actions';
import constants from '../../../theme/constants';
import {FlatList, InnerWrapper, VendorTile} from '../../../components';
import {withTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomePage = ({theme, height}) => {
  useEffect(() => {
    getAllVendors();
  }, []);

  const {colors} = theme;

  const [allVendors, setAllVendors] = useState([]);

  const getAllVendors = async () => {
    let allVends;
    // let asyncVendors = await getFromAsyncVendors();
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

  // const logout = async () => {
  //   await AsyncStorage.removeItem(constants.async.user);
  //   props.setUserInfoAction({userType: 'none'});
  // };

  return (
    <InnerWrapper>
      <View style={styles(colors, height).searchView}>
        <TextInput
          mode="flat"
          style={styles(colors, height).searchInput}
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
        <FlatList
          data={allVendors}
          renderItem={({item}) => <VendorTile item={item} />}
          horizontal={false}
        />
      )}
    </InnerWrapper>
  );
};

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {setUserInfoAction})(
  withTheme(HomePage),
);
