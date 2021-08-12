import React, {useEffect} from 'react';
import {BackHandler, Text} from 'react-native';
import {InnerWrapper} from '../../../components';
import {connect} from 'react-redux';
import {setCurrentScreen} from '../../../redux/actions';
import constants from '../../../theme/constants';
import navigator from '../../../utils/navigator';

const Profile = props => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigator.navigate(constants.appScreens.Home);
        props.setCurrentScreen(constants.appScreens.Home);
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  return (
    <InnerWrapper>
      <Text>Profile</Text>
    </InnerWrapper>
  );
};

export default connect(null, {setCurrentScreen})(Profile);
