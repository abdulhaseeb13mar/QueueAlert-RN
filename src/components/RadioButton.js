import React from 'react';
import {View, StyleSheet} from 'react-native';

const RadioButton = props => {
  return (
    <View style={[styles.initialStyle, props.style]}>
      {props.selected && <View style={styles.selected} />}
    </View>
  );
};

const styles = StyleSheet.create({
  initialStyle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#be3232',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#be3232',
  },
});

export default RadioButton;
