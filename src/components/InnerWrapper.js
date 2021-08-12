import React from 'react';
import {View, StyleSheet} from 'react-native';

const InnerWrapper = props => (
  <View style={styles.InnerWrapper}>{props.children}</View>
);

const styles = StyleSheet.create({
  InnerWrapper: {
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default InnerWrapper;
