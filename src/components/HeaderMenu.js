/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {width, height, screenHorizontalPadding} from './Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigator from '../utils/navigator';
import constants from '../theme/constants';
import {connect} from 'react-redux';
import {setCurrentScreen} from '../redux/actions';

const HeaderMenu = props => {
  const {appScreens} = constants;

  const handleNavigation = (screen, tab) => {
    navigator.navigate(screen);
    props.setCurrentScreen(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 28, fontWeight: 'bold'}}>Q Alert</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => handleNavigation(appScreens.Home, 0)}>
          <Ionicons
            name={`ios-home${
              props.currentScreen === appScreens.Home ? '' : '-outline'
            }`}
            size={23}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation(appScreens.Profile, 1)}>
          <Ionicons
            name={`ios-person${
              props.currentScreen === appScreens.Profile ? '' : '-outline'
            }`}
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    paddingVertical: '2%',
    backgroundColor: 'white',
    elevation: 5,
  },
});

const mapStateToProps = state => ({
  currentScreen: state.ScreenReducer,
});

export default connect(mapStateToProps, {setCurrentScreen})(HeaderMenu);
