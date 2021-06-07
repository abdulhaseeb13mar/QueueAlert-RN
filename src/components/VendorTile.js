/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const VendorTile = props => {
  useEffect(() => {}, []);

  return (
    <View>
      {console.log(props)}
      <Text>{props.item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default VendorTile;
