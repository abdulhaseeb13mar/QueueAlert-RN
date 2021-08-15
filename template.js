import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {InnerWrapper} from '../../../components';
import constants from '../../../theme/constants';
import {withTheme} from 'react-native-paper';

const UserInfo = ({theme, height, ...props}) => {
  const StyleProp = {colors: theme.colors, height};
  return (
    <InnerWrapper>
      <Text>userinfo</Text>
    </InnerWrapper>
  );
};

const styles = ({colors, height}) => StyleSheet.create({});

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {})(withTheme(UserInfo));
