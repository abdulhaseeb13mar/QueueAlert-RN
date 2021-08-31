import React, {useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {withTheme} from 'react-native-paper';

import DefaultImage from '../assets/default.jpg';

const VendorTile = ({theme, height, item, onPress}) => {
  useEffect(() => {}, []);
  const StyleProp = {colors: theme.colors, height};

  return (
    <TouchableOpacity
      style={styles(StyleProp).cardContainer}
      onPress={() => onPress(item)}>
      <FastImage
        source={{uri: item.photoUrl}}
        resizeMode="cover"
        style={styles(StyleProp).imageStyle}
      />
      <Text style={styles(StyleProp).cardText} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = ({colors, height}) =>
  StyleSheet.create({
    cardContainer: {
      width: '50%',
      alignItems: 'center',
      marginBottom: height * 0.03,
    },
    imageStyle: {
      width: '88%',
      aspectRatio: 460 / 384,
      borderRadius: 15,
      elevation: 5,
    },
    cardText: {fontWeight: 'bold', marginTop: height * 0.007},
  });

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {})(withTheme(VendorTile));
