import React from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfoAction} from '../../../redux/actions';
import {InnerWrapper} from '../../../components';
import constants from '../../../theme/constants';
import {withTheme} from 'react-native-paper';

const Profile = ({theme, height, ...props}) => {
  const {async} = constants;

  const logout = async () => {
    await AsyncStorage.removeItem(async.user);
    props.setUserInfoAction({userType: 'none'});
  };
  return (
    <InnerWrapper>
      <Button title="logout" onPress={logout} />
    </InnerWrapper>
  );
};

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {setUserInfoAction})(
  withTheme(Profile),
);
