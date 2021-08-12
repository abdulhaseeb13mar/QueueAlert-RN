import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {width, height, screenHorizontalPadding} from './Responsive';

const HeaderMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 28, fontWeight: 'bold'}}>Q Alert</Text>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    paddingVertical: '2%',
  },
});

export default HeaderMenu;
