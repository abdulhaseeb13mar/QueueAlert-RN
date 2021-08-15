import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {withTheme} from 'react-native-paper';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {width} from './Responsive';
import navigator from '../utils/navigator';
import Constants from '../theme/constants';

const NumberTile = ({height, theme, number}) => {
  const {colors} = theme;
  const StyleProp = {colors, height};

  const moveToUserInfo = () =>
    navigator.navigate(Constants.appScreens.UserInfo, number);

  return (
    <View style={styles(StyleProp).tileContainer}>
      <View style={styles(StyleProp).numberCircle}>
        <Text style={styles(StyleProp).numberText}>{number.number}</Text>
      </View>
      <View style={styles(StyleProp).connectLine} />
      <View style={styles(StyleProp).nameContainer}>
        <Text numberOfLines={1} style={styles(StyleProp).nameText}>
          {number.name}
        </Text>
        <TouchableOpacity
          style={styles(StyleProp).iconContainer}
          onPress={moveToUserInfo}>
          <Ionicons name="ios-information-circle-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ({colors, height}) =>
  StyleSheet.create({
    tileContainer: {
      width: '98.5%',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: height * 0.01,
    },
    numberCircle: {
      width: width * 0.1,
      height: width * 0.1,
      borderColor: '#bcbcbc',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: width * 0.05,
      elevation: 4,
      backgroundColor: '#272727',
    },
    numberText: {fontWeight: 'bold', fontSize: 14, color: 'white'},
    connectLine: {
      width: width * 0.03,
      marginHorizontal: width * 0.02,
      backgroundColor: 'black',
      height: 2,
    },
    nameContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 15,
      minHeight: height * 0.07,
      elevation: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.02,
    },
    nameText: {
      fontSize: 17,
      fontWeight: 'bold',
      width: width * 0.5,
    },
    iconContainer: {
      width: '12%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {})(withTheme(NumberTile));
