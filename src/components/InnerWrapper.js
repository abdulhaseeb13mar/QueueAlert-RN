import React from 'react';
import {View, StyleSheet} from 'react-native';
import {screenHorizontalPadding} from './Responsive';

const InnerWrapper = props => (
  <View style={styles.InnerWrapper}>{props.children}</View>
);

const styles = StyleSheet.create({
  InnerWrapper: {
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: screenHorizontalPadding,
  },
});

export default InnerWrapper;
