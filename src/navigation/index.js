import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from '../utils/';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfoAction} from '../redux/actions';
import constants from '../theme/constants';

//Stacks
import AuthStack from './authStack';
import PeopleStack from './appstack/people';
import VendorStack from './appstack/vendor';

const Routes = props => {
  useEffect(() => {
    getAsyncUserInfo();
  }, []);

  const getAsyncUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem(constants.async.user);
      let data = userInfo != null ? JSON.parse(userInfo) : {userType: 'none'};
      props.setUserInfoAction(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NavigationContainer
      ref={navigatorRef => Navigator.setTopLevelNavigator(navigatorRef)}>
      {props.user != null ? (
        props.user.userType === 'person' ? (
          <PeopleStack />
        ) : props.user.userType === 'vendor' ? (
          <VendorStack />
        ) : (
          <AuthStack />
        )
      ) : null}
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, {setUserInfoAction})(Routes);
