import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from '../utils/';

//Stacks
import AuthStack from './authStack';

//Client
// import AppStack from './appstack/client';

const Routes = () => (
  <NavigationContainer
    ref={(navigatorRef) => Navigator.setTopLevelNavigator(navigatorRef)}>
    <AuthStack />
  </NavigationContainer>
);

export default Routes;
