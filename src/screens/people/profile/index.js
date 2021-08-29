/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {InnerWrapper} from '../../../components';
import {connect} from 'react-redux';
import {setCurrentScreen} from '../../../redux/actions';
import constants from '../../../theme/constants';
import {useFocusEffect} from '@react-navigation/native';

const Profile = props => {
  useFocusEffect(
    useCallback(() => {
      props.setCurrentScreen(constants.appScreens.Profile);
    }, []),
  );
  return (
    <InnerWrapper>
      <Text>Profile</Text>
    </InnerWrapper>
  );
};

const mapStateToProps = state => ({
  height: state.HeightReducer,
  currentScreen: state.ScreenReducer,
});

export default connect(mapStateToProps, {setCurrentScreen})(Profile);
