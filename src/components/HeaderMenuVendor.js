import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {width} from './Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigator from '../utils/navigator';
import constants from '../theme/constants';
import {connect} from 'react-redux';
import {setCurrentScreen} from '../redux/actions';

const HeaderMenu = props => {
  const {appScreens} = constants;

  const handleNavigation = screen => {
    navigator.navigate(screen);
    props.setCurrentScreen(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Q Alert</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => handleNavigation(appScreens.Home)}>
          <Ionicons
            name={`ios-home${
              props.currentScreen === appScreens.Home ? '' : '-outline'
            }`}
            size={23}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation(appScreens.QueueList)}>
          <Ionicons
            name={`ios-list-circle${
              props.currentScreen === appScreens.QueueList ? '' : '-outline'
            }`}
            size={23}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation(appScreens.AddPerson)}>
          <Ionicons
            name={`ios-person-add${
              props.currentScreen === appScreens.AddPerson ? '' : '-outline'
            }`}
            size={23}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation(appScreens.Profile)}>
          <Ionicons
            name={`ios-settings${
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
  iconsContainer: {flexDirection: 'row'},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    paddingVertical: '2%',
    backgroundColor: 'white',
    elevation: 5,
  },
  appName: {fontSize: 28, fontWeight: 'bold'},
});

const mapStateToProps = state => ({
  currentScreen: state.ScreenReducer,
});

export default connect(mapStateToProps, {setCurrentScreen})(HeaderMenu);
