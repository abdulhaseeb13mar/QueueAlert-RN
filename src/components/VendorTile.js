import React, {useEffect} from 'react';
import {Text, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {withTheme} from 'react-native-paper';

const VendorTile = ({theme, height, item, onPress}) => {
  useEffect(() => {}, []);
  const StyleProp = {colors: theme.colors, height};

  return (
    <View style={styles(StyleProp).outWrapper}>
      <TouchableWithoutFeedback
        style={styles(StyleProp).cardContainer}
        onPress={() => onPress(item)}>
        <View style={styles(StyleProp).innerCardContainer}>
          <FastImage
            source={{uri: item.photoUrl}}
            resizeMode="cover"
            style={styles(StyleProp).imageStyle}
          />
          <Text style={styles(StyleProp).cardText} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = ({colors, height}) =>
  StyleSheet.create({
    outWrapper: {width: '50%'},
    cardContainer: {
      alignItems: 'center',
      marginBottom: height * 0.03,
    },
    innerCardContainer: {width: '100%', alignItems: 'center'},
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
