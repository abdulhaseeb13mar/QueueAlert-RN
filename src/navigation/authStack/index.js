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
  const {authScreens} = constants;
  return (
    <Stack.Navigator
      initialRouteName={authScreens.Login}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}>
      <Stack.Screen name={authScreens.Login} component={Login} />
      <Stack.Screen name={authScreens.SignupPeople} component={SignupPeople} />
      <Stack.Screen name={authScreens.SignupVendor} component={SignupVendor} />
    </Stack.Navigator>
  );
}
