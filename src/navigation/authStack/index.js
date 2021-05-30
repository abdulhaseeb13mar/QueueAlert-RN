import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {constants} from '../../theme';

//Screens
import {SignupPeople, SignupVendor, Login} from '../../screens/auth';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={constants.authScreens.SignupPeople}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}>
      <Stack.Screen name={constants.authScreens.Login} component={Login} />
      <Stack.Screen
        name={constants.authScreens.SignupPeople}
        component={SignupPeople}
      />
      <Stack.Screen
        name={constants.authScreens.SignupVendor}
        component={SignupVendor}
      />
    </Stack.Navigator>
  );
}
