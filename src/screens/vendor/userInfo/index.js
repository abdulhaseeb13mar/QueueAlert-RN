import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {InnerWrapper} from '../../../components';
// import constants from '../../../theme/constants';
import {withTheme} from 'react-native-paper';
import {getAge} from '../../../utils/helpers';

const UserInfo = ({theme, height, ...props}) => {
  //   const StyleProp = {colors: theme.colors, height};
  const user = props.route.params;
  return (
    <InnerWrapper>
      <View>
        <Text>NAME: {user.name}</Text>
        <Text>AGE: {getAge(new Date(user.dob.toDate()).toDateString())}</Text>
        <Text>GENDER: {user.gender}</Text>
        <Text>EMAIL: {user.email}</Text>
        <Text>Queue Number: {user.number}</Text>
      </View>
    </InnerWrapper>
  );
};

const styles = ({colors, height}) => StyleSheet.create({});

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {})(withTheme(UserInfo));
